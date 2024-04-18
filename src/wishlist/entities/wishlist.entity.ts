import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Recipe } from '../../recipe/entities/recipe.entity';

@Entity('wishlist')
export class Wishlist {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.reviews)
  user: Relation<User>;

  @ApiProperty()
  @ManyToMany(() => Recipe, (recipe) => recipe.wishlists)
  @JoinTable()
  recipes: Recipe[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
