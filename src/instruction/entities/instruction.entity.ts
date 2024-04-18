import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('instruction')
export class Instruction {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty()
  @Column()
  order: number;

  @ApiProperty()
  @ManyToOne(() => Recipe, (recipe) => recipe.instructions)
  recipe: Relation<Recipe>;
}
