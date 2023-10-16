import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
