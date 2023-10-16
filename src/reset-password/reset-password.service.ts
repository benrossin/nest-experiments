import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ResetPasswordTokenDto } from './dto/reset-password-token.dto';
import { ResetPassword } from './entities/reset-password.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ResetPasswordService {
  constructor(@InjectRepository(ResetPassword) private resetPasswordRepository: Repository<ResetPassword>) {}

  /**
   * Créer un token pour modifier le mot de passe d'un utilisateur
   */
  async create(user: User): Promise<ResetPassword> {
    const resetPassword = this.resetPasswordRepository.create({
      user: user,
      resetToken: this.generateResetPasswordToken(),
      isConsumed: false,
      expirationDate: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.resetPasswordRepository.save(resetPassword);
    return resetPassword;
  }

  /**
   * Récupère le dernier token généré par l'utilisateur
   */
  async findLastTokenByUser(user: User): Promise<ResetPassword | null> {
    return await this.resetPasswordRepository.findOne({
      where: {
        user: { id: user.id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Récupère en fonction du token
   */
  async findByToken(token: ResetPasswordTokenDto['token']): Promise<ResetPassword> {
    const resetPassword = await this.resetPasswordRepository.findOne({
      where: { resetToken: token },
    });

    if (!resetPassword) {
      throw new BadRequestException('Erreur lors du changement du mot de passe');
    }

    return resetPassword;
  }

  /**
   * Génère un token pour réinitialiser le mot de passe
   */
  generateResetPasswordToken(): string {
    const token = crypto.randomBytes(32).toString('hex');
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
