import { Controller, Post, Body, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dtos/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dtos/login-auth.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from '../reset-password/dto/reset-password.dto';
import { ResetPasswordTokenDto } from '../reset-password/dto/reset-password-token.dto';
import { CurrentUser } from './decorators/user.decorator';
import { TokensDto } from './dtos/tokens.dto';
import { UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import {
  SwaggerForgotPassword,
  SwaggerLogin,
  SwaggerLogout,
  SwaggerMe,
  SwaggerRefreshTokens,
  SwaggerRegister,
  SwaggerResetPassword,
} from './decorators/swagger.decorator';
import { GoogleGuard } from './guards/google.guard';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SwaggerRegister()
  async register(@Body() registerAuthDto: RegisterAuthDto): Promise<User> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @SwaggerLogin()
  async login(@Body() authDto: LoginAuthDto): Promise<TokensDto> {
    return this.authService.login(authDto);
  }

  @Post('logout')
  @Auth()
  @SwaggerLogout()
  async logout(@CurrentUser() user: User): Promise<UpdateResult> {
    return this.authService.logout(user);
  }

  @Post('forgot-password')
  @SwaggerForgotPassword()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @SwaggerResetPassword()
  async resetPassword(@Query() resetPasswordTokenDto: ResetPasswordTokenDto, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordTokenDto, resetPasswordDto);
  }

  @Get('me')
  @Auth()
  @SwaggerMe()
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Post('refresh')
  @SwaggerRefreshTokens()
  refreshTokens(@CurrentUser() user: JwtPayloadDto): Promise<TokensDto> {
    return this.authService.refreshTokens(user);
  }

  /*=================*
   * GOOGLE PROVIDER
   *=================*/

  @Get('google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  googleLogin(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  googleRedirect(@Req() req) {
    return this.authService.loginGoogle(req);
  }
}
