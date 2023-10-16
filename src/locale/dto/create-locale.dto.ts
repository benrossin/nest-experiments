import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocaleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Vous devez définir le nom de la langue' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Vous devez définir le code de la langue' })
  code: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Vous devez définir si c'est la langue par défaut" })
  isDefault: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Vous devez définir le drapeau' })
  flagIcon: string;
}
