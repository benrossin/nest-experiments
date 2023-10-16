import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class RegisterAuthDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123' })
  @MinLength(3, { message: 'Le mot de passe doit faire au moins 3 caractères' })
  @IsString()
  password: string;

  @ApiProperty({ example: '123' })
  @Match('password', { message: 'Le mot de passe doit être identique' })
  @MinLength(3)
  @IsString()
  confirmPassword: string;
}
