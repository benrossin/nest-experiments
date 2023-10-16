import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateParcourTranslationsDto } from './create-parcour-translations.dto';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateParcoursTranslationsDto extends PartialType(CreateParcourTranslationsDto) {
  @ApiPropertyOptional()
  @IsString({ message: 'Le nom du parcours doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Vous devez définir le nom du parcours' })
  name?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'La description du parcours doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Vous devez définir la description du parcours' })
  description?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Vous devez définir la langue de la traduction' })
  localeId: string;
}
