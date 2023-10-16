import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Match } from '../../common/decorators/match.decorator';

export class ResetPasswordDto {
  @ApiProperty({ example: '123' })
  @MinLength(3)
  @IsString()
  password: string;

  @ApiProperty({ example: '123' })
  @Match('password', { message: 'Le mot de passe doit être identique' })
  @MinLength(3)
  @IsString()
  confirmPassword: string;
}
