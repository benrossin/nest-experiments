import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateParcoursTranslationsDto } from './update-parcours-translations.dto';

export class UpdateParcourDto {
  @ApiPropertyOptional({ example: 'https://image.jpg' })
  @IsOptional()
  @IsUrl({}, { message: "L'URL de l'image doit être une URL valide" })
  @IsNotEmpty({ message: "Vous devez définir l'URL de l'image" })
  thumbnail?: string;

  @ApiPropertyOptional({ example: 'Tours' })
  @IsOptional()
  @IsString({ message: 'Le lieu du parcours doit être une chaîne de caractères' })
  place?: string;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt({ message: 'Le temps du parcours doit être un nombre entier' })
  @IsNotEmpty({ message: 'Vous devez définir le lieu du parcours' })
  time?: number;

  @ApiPropertyOptional({ type: [UpdateParcoursTranslationsDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateParcoursTranslationsDto)
  @IsOptional()
  @ArrayNotEmpty({ message: 'Vous devez définir au moins une traduction pour ce parcours' })
  parcoursTranslations?: UpdateParcoursTranslationsDto[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty({ message: 'Vous devez définir le thème du parcours' })
  themeId?: string;
}
