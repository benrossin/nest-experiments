import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('reset_password')
export class ResetPassword {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  resetToken: string;

  @ApiProperty()
  @Column()
  expirationDate: Date;

  @ApiProperty()
  @Column()
  isConsumed: boolean;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.resetPasswords, { eager: true })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
