import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ParcoursTranslations } from '../../parcours/entities/parcours-translations.entity';
import { ParcoursThemeProfileTranslations } from '../../parcours-theme-profile/entity/parcours-theme-profile-translations.entity';

@Entity('locale')
export class Locale {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  isDefault: boolean;

  @ApiProperty()
  @Column()
  flagIcon: string;

  @ApiProperty()
  @OneToMany(() => ParcoursTranslations, (parcoursTranslations) => parcoursTranslations.locale)
  parcoursTranslations: ParcoursTranslations[];

  @ApiProperty()
  @OneToMany(() => ParcoursThemeProfileTranslations, (parcoursThemeProfileTranslations) => parcoursThemeProfileTranslations.locale)
  parcoursThemeProfileTranslations: ParcoursThemeProfileTranslations[];
}
