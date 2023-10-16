import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ResetPassword } from 'src/reset-password/entities/reset-password.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatorService } from '../common/services/paginator.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { StripeService } from '../stripe/stripe.service';
import { RegisterAuthDto } from '../auth/dtos/register-auth.dto';

@Injectable()
export class UserService {
  constructor(
    private paginatorService: PaginatorService,
    private stripeService: StripeService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ResetPassword) private resetPasswordRepository: Repository<ResetPassword>,
  ) {}

  /**
   * Rechercher un utilisateur par son id
   */
  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return user;
  }

  /**
   * Rechercher l'utilisateur par mail
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  /**
   * Récupérer tous les utilisateurs
   */
  async findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationDto<User>> {
    return this.paginatorService.paginate(this.userRepository, paginationQueryDto);
  }

  /**
   * Créer un utilisateur
   */
  async create(data: Omit<RegisterAuthDto, 'confirmPassword'>): Promise<User> {
    const stripeCustomer = await this.stripeService.createCustomer(data.email);
    if (!stripeCustomer) {
      throw new BadRequestException('Une erreur est survenue lors de la création du compte');
    }

    const newUser = await this.userRepository.create({ ...data, stripeCustomerId: stripeCustomer.id });
    await this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * Mets à jour un utilisateur
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (err) {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }

  /**
   * Supprimer un utilisateur par son id
   */
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete({ id });
    } catch (err) {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }

  /**
   * Mets à jour le mot de passe d'un utilisateur
   */
  async updateUserPassword(resetPassword: ResetPassword, password: string): Promise<UpdateResult> {
    try {
      await this.userRepository.update({ id: resetPassword.user.id }, { password });
      return this.resetPasswordRepository.update(resetPassword.id, { isConsumed: true });
    } catch (err) {
      throw new NotFoundException('Utilisateur introuvable');
    }
  }
}
