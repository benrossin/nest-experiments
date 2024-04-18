import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { Unit } from '../../unit/entities/unit.entity';

@Entity('recipe_ingredient')
export class RecipeIngredient {
  @Column()
  @PrimaryColumn('uuid')
  recipeId: string;

  @Column()
  @PrimaryColumn('uuid')
  ingredientId: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @ManyToOne(() => Unit, (unit) => unit.ingredients)
  unit: Unit;

  @ApiProperty()
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;

  @ApiProperty()
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;
}
