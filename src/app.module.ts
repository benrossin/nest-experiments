import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { ParcoursModule } from './parcours/parcours.module';
import { LocaleModule } from './locale/locale.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AbilityModule } from './ability/ability.module';
import TypeOrmConfig from './database/typeorm.config';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => TypeOrmConfig.getOrmConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    AbilityModule,
    SendgridModule,
    UserModule,
    ResetPasswordModule,
    ParcoursModule,
    LocaleModule,
    StripeModule,
  ],
  providers: [],
})
export class AppModule {}
