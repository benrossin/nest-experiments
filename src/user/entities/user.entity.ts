import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/roles.enum';
import { ResetPassword } from '../../reset-password/entities/reset-password.entity';
import { Parcours } from '../../parcours/entities/parcours.entity';
import { Exclude } from 'class-transformer';
import { Provider } from '../../auth/enums/providers.enum';
import { Recipe } from '../../recipe/entities/recipe.entity';
import { Review } from '../../review/entities/review.entity';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { CalendarEvent } from '../../calendar/entities/calendar-event.entity';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Provider,
    nullable: true,
  })
  provider: Provider;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true, unique: true })
  refreshToken: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ unique: true })
  stripeCustomerId: string;

  @ApiProperty()
  @OneToMany(() => ResetPassword, (resetPassword) => resetPassword.user, { onDelete: 'CASCADE' })
  resetPasswords: ResetPassword[];

  @ApiProperty()
  @OneToMany(() => Parcours, (parcours) => parcours.user, { onDelete: 'CASCADE' })
  parcours: Parcours[];

  @ApiProperty()
  @OneToMany(() => Recipe, (recipe) => recipe.user, { onDelete: 'CASCADE' })
  recipes: Recipe[];

  @ApiProperty()
  @OneToMany(() => Review, (review) => review.author, { onDelete: 'CASCADE' })
  reviews: Review[];

  @ApiProperty()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.user, { onDelete: 'CASCADE' })
  wishlists: Wishlist[];

  @ApiProperty()
  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.user, { onDelete: 'CASCADE' })
  calendarEvents: CalendarEvent[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
