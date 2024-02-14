import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  dateOfBirth: string;

  @OneToOne(() => UserEntity,user => user.profile)
  @JoinColumn()
  user: UserEntity;
}


// export interface Profile {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   dateOfBirth: string;
//   user?: User; // L'utilisateur est facultatif car un profil peut ne pas être lié à un utilisateur
// }
