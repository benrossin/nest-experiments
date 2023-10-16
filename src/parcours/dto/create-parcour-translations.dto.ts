import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateParcourTranslationsDto {
  @ApiProperty()
  @IsString({ message: 'Le nom du parcours doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Vous devez définir le nom du parcours' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'La description du parcours doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Vous devez définir la description du parcours' })
  description: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Vous devez définir la langue de la traduction' })
  localeId: string;
}
