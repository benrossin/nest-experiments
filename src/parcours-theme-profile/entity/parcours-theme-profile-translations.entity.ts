import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Locale } from '../../locale/entities/locale.entity';
import { IsNotEmpty } from 'class-validator';
import { ParcoursThemeProfile } from './parcours-theme-profile.entity';

@Entity('parcours_theme_profile_translations')
export class ParcoursThemeProfileTranslations {
  @Column()
  @IsNotEmpty()
  @PrimaryColumn('uuid')
  parcoursThemeProfileId: string;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn('uuid')
  localeId: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => ParcoursThemeProfile, (parcoursProfile) => parcoursProfile.profileTranslations)
  @JoinColumn({ name: 'parcoursThemeProfileId' })
  profile: ParcoursThemeProfile;

  @ApiProperty()
  @ManyToOne(() => Locale, (locale) => locale.parcoursThemeProfileTranslations)
  @JoinColumn({ name: 'localeId' })
  locale: Locale;
}
