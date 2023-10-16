import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'benjamin-dupont', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'https://avatar.com', required: false })
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;

  @ApiProperty({ example: 'Benjamin', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Dupont', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;
}
