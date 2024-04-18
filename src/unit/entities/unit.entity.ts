import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeIngredient } from '../../recipe/entities/recipe-ingredient.entity';

@Entity('unit')
export class Unit {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient, { onDelete: 'CASCADE' })
  ingredients: RecipeIngredient[];
}
