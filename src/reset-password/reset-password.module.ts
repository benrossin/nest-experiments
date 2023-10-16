import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPassword } from './entities/reset-password.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { PaginatorService } from '../common/services/paginator.service';
import { StripeService } from '../stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResetPassword, User])],
  providers: [ResetPasswordService, UserService, PaginatorService, StripeService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
