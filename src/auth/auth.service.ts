import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { ResetPasswordService } from '../reset-password/reset-password.service';
import { ResetPasswordDto } from '../reset-password/dto/reset-password.dto';
import { ResetPasswordTokenDto } from '../reset-password/dto/reset-password-token.dto';
import { UserService } from '../user/user.service';
import { forgotPasswordTemplateId } from '../sendgrid/constants/sendgrid-templates.constant';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { TokensDto } from './dtos/tokens.dto';
import { BcryptService } from '../common/services/bcrypt.service';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { StripeService } from '../stripe/stripe.service';
import { Provider } from './enums/providers.enum';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sendgridService: SendgridService,
    private resetPasswordService: ResetPasswordService,
    private bcryptService: BcryptService,
    private configService: ConfigService,
    private stripeService: StripeService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * Enregistrer un utilisateur
   */
  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    delete registerAuthDto.confirmPassword;

    const user = await this.userService.findUserByEmail(registerAuthDto.email);
    if (user) {
      throw new BadRequestException('Cet utilisateur existe déjà');
    }

    registerAuthDto.password = await this.bcryptService.hash(registerAuthDto.password);

    return this.userService.create(registerAuthDto);
  }

  /**
   * Connecter un utilisateur
   */
  async login(authDto: LoginAuthDto): Promise<TokensDto> {
    const user = await this.validateUser(authDto.email, authDto.password);
    return await this.getTokens(user);
  }

  /**
   * Déconnecter un utilisateur
   */
  async logout(user: User): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(user.id, { refreshToken: null });
    } catch (err) {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }

  /**
   * Refresh tokens
   */
  async refreshTokens(currentUser: JwtPayloadDto): Promise<TokensDto> {
    const user = await this.userService.findOne(currentUser.sub);

    const refreshTokenMatches = await this.bcryptService.compare(currentUser.refreshToken, user.refreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    return await this.getTokens(user);
  }

  /**
   * Récupérer un mot de passe
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
    const user = await this.userService.findUserByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    const resetPassword = await this.resetPasswordService.create(user);

    const forgotLink = `${this.configService.get<string>('FRONT_URL')}/auth/reset-password?token=${resetPassword.resetToken}`;

    await this.sendgridService.send({
      to: forgotPasswordDto.email,
      from: this.configService.get<string>('SENDGRID_EMAIL'),
      dynamicTemplateData: {
        resetLink: forgotLink,
      },
      templateId: forgotPasswordTemplateId,
    });

    return true;
  }

  /**
   * Réinitialise le mot de passe d'un utilisateur
   */
  async resetPassword(resetPasswordTokenDto: ResetPasswordTokenDto, resetPasswordDto: ResetPasswordDto) {
    const resetPassword = await this.resetPasswordService.findByToken(resetPasswordTokenDto.token);
    const lastResetPassword = await this.resetPasswordService.findLastTokenByUser(resetPassword.user);

    if (new Date() > resetPassword.expirationDate || lastResetPassword.resetToken !== resetPasswordTokenDto.token) {
      throw new BadRequestException('Ce lien a expiré');
    }

    if (resetPassword.isConsumed) {
      throw new BadRequestException('Le mot de passe a déjà été modifié');
    }

    const hashPassword = await this.bcryptService.hash(resetPasswordDto.password);
    await this.userService.updateUserPassword(resetPassword, hashPassword);
  }

  /**
   * Valider si les identifiants de login de l'utilisateur sont corrects
   */
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordMatch = await this.bcryptService.compare(pass, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException(`Identifiant ou mot de passe incorrect`);
    }

    return user;
  }

  /**
   * Met à jour le refresh token en bdd
   */
  async updateRefreshToken(user: User, refreshToken: string) {
    const hash = await this.bcryptService.hash(refreshToken);
    await this.userRepository.update(user.id, { refreshToken: hash });
  }

  /**
   * Permet de créer l'access token et le refresh token
   */
  async getTokens(user: User) {
    const jwtPayload = await this.transformUserToJwtPayload(user);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('REFRESH_JWT_SECRET_KEY'),
        expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRATION'),
      }),
    ]);

    await this.updateRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Transforme un utilisateur sans mdp en jwt payload
   */
  async transformUserToJwtPayload(user: User): Promise<JwtPayloadDto> {
    return {
      sub: user.id,
      thumbnail: user.thumbnail,
      refreshToken: user.refreshToken,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }

  /*=================*
   * GOOGLE PROVIDER
   *=================*/
  /**
   * Connecter un utilisateur avec Google
   */
  async loginGoogle(data) {
    if (!data.user) throw new BadRequestException();

    const user = await this.userService.findUserByEmail(data.user.email);
    if (user && user.provider === Provider.GOOGLE) {
      return await this.getTokens(user);
    }

    if (user) {
      throw new ForbiddenException("Cet utilisateur existe déjà, il n'est pas relié à un compte Google");
    }

    data.user.provider = Provider.GOOGLE;
    const newUser = await this.userService.create(data.user);

    return await this.getTokens(newUser);
  }
}
