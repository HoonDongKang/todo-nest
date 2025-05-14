import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usernmae: string;

  @Column()
  password: string;

  @Column()
  nicknmae: string;

  @CreateDateColumn()
  createdAt: Date;
}
