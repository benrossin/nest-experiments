import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('review')
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  rating: number;

  @ApiProperty()
  @Column({ type: 'text' })
  comment: string;

  @ApiProperty()
  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  recipe: Relation<Recipe>;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.reviews)
  author: Relation<User>;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
