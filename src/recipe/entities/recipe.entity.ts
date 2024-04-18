import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Review } from '../../review/entities/review.entity';
import { Category } from '../../category/entities/category.entity';
import { Instruction } from '../../instruction/entities/instruction.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { CalendarEvent } from '../../calendar/entities/calendar-event.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Entity('recipe')
export class Recipe {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column()
  preparationTime: number;

  @ApiProperty()
  @Column({ default: 1 })
  servings: number;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.recipes)
  user: Relation<User>;

  @ApiProperty()
  @OneToMany(() => Review, (review) => review.recipe, { onDelete: 'CASCADE' })
  reviews: Review[];

  @ApiProperty()
  @OneToMany(() => Instruction, (instruction) => instruction.recipe, { onDelete: 'CASCADE' })
  instructions: Instruction[];

  @ApiProperty()
  @ManyToMany(() => Category, (category) => category.recipes)
  @JoinTable()
  categories: Category[];

  @ApiProperty()
  @ManyToMany(() => Wishlist, (wishlist) => wishlist.recipes)
  @JoinTable()
  wishlists: Wishlist[];

  @ApiProperty()
  @ManyToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.recipes)
  @JoinTable()
  calendarEvents: CalendarEvent[];

  @ApiProperty()
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe, { onDelete: 'CASCADE' })
  ingredients: RecipeIngredient[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
