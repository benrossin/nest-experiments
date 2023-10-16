import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParcoursTheme } from '../../parcours-theme/entities/parcours-theme.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ParcoursThemeProfileTranslations } from './parcours-theme-profile-translations.entity';

@Entity('parcours_theme_profile')
export class ParcoursThemeProfile {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  percent: number;

  @ApiProperty()
  @Column()
  thumbnail: string;

  @ApiProperty()
  @ManyToOne(() => ParcoursTheme, (theme) => theme.profiles)
  theme: ParcoursTheme;

  @ApiProperty()
  @OneToMany(() => ParcoursThemeProfileTranslations, (parcoursProfileTranslations) => parcoursProfileTranslations.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  profileTranslations: ParcoursThemeProfileTranslations[];
}
