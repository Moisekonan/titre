import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
import { TodoEntity } from './todo.entity';
import { ProfileEntity } from './profile.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(() => ProfileEntity, profile => profile.user, { cascade: true })
  profile: ProfileEntity;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];
}