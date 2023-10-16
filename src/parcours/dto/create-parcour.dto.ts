import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { CreateParcourTranslationsDto } from './create-parcour-translations.dto';
import { Type } from 'class-transformer';

export class CreateParcourDto {
  @ApiProperty({ example: 'https://image.jpg' })
  @IsUrl({}, { message: "L'URL de l'image doit être une URL valide" })
  @IsNotEmpty({ message: "Vous devez définir l'URL de l'image" })
  thumbnail: string;

  @ApiProperty({ example: 'Tours' })
  @IsString({ message: 'Le lieu du parcours doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Vous devez définir le lieu du parcours' })
  place: string;

  @ApiProperty({ example: 60 })
  @IsInt({ message: 'Le temps du parcours doit être un nombre entier' })
  @IsNotEmpty({ message: 'Vous devez définir le temps du parcours' })
  time: number;

  @ApiProperty({ type: [CreateParcourTranslationsDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateParcourTranslationsDto)
  @ArrayNotEmpty({ message: 'Vous devez définir au moins une traduction pour ce parcours' })
  parcoursTranslations: CreateParcourTranslationsDto[];

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'Vous devez définir le thème du parcours' })
  themeId: string;
}
