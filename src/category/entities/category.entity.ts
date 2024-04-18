import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('category')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToMany(() => Recipe, (recipe) => recipe.categories)
  @JoinTable()
  recipes: Recipe[];
}
