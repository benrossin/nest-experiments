import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { ParcoursTheme } from '../../parcours-theme/entities/parcours-theme.entity';
import { ParcoursTranslations } from './parcours-translations.entity';

@Entity('parcours')
export class Parcours {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  thumbnail: string;

  @ApiProperty()
  @Column()
  place: string;

  @ApiProperty()
  @Column()
  time: number;

  @ApiProperty()
  @Column({ default: false })
  isPublished: boolean;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.parcours)
  user: Relation<User>;

  @ApiProperty()
  @ManyToOne(() => ParcoursTheme, (parcoursTheme) => parcoursTheme.parcours)
  parcoursTheme: ParcoursTheme;

  @ApiProperty()
  @OneToMany(() => ParcoursTranslations, (parcoursTranslations) => parcoursTranslations.parcours, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  parcoursTranslations: ParcoursTranslations[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
