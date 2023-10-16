import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Parcours } from '../../parcours/entities/parcours.entity';
import { ParcoursThemeProfile } from '../../parcours-theme-profile/entity/parcours-theme-profile.entity';

@Entity('parcours_theme')
export class ParcoursTheme {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  pathStyles: string;

  @ApiProperty()
  @OneToMany(() => Parcours, (parcours) => parcours.parcoursTheme)
  parcours: Parcours[];

  @ApiProperty()
  @OneToMany(() => ParcoursThemeProfile, (profile) => profile.theme)
  profiles: ParcoursThemeProfile[];
}
