import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PaginatorService } from '../common/services/paginator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ResetPassword } from '../reset-password/entities/reset-password.entity';
import { StripeService } from '../stripe/stripe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ResetPassword])],
  controllers: [UserController],
  providers: [UserService, PaginatorService, StripeService],
  exports: [UserService],
})
export class UserModule {}
