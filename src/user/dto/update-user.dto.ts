import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'https://avatar.com', required: false })
  @IsOptional()
  @IsString()
  @IsUrl()
  thumbnail?: string;
}
