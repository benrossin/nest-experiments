import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ResetPasswordModule } from '../reset-password/reset-password.module';
import { SendgridModule } from '../sendgrid/sendgrid.module';
import { UserModule } from '../user/user.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { BcryptService } from '../common/services/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { StripeService } from '../stripe/stripe.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    ResetPasswordModule,
    SendgridModule,
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, GoogleStrategy, BcryptService, StripeService],
  exports: [AuthService],
})
export class AuthModule {}
