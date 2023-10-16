import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Parcours } from './parcours.entity';
import { Locale } from '../../locale/entities/locale.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('parcours_translations')
export class ParcoursTranslations {
  @Column()
  @IsNotEmpty()
  @PrimaryColumn('uuid')
  parcoursId: string;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn('uuid')
  localeId: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @ManyToOne(() => Parcours, (parcours) => parcours.parcoursTranslations)
  @JoinColumn({ name: 'parcoursId' })
  parcours: Parcours;

  @ApiProperty()
  @ManyToOne(() => Locale, (locale) => locale)
  @JoinColumn({ name: 'localeId' })
  locale: Locale;
}
