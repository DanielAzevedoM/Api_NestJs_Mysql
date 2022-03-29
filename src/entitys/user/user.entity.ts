import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn  } from 'typeorm';
import { Person } from './person.entity';


@Entity()
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string

  @Column()
  password: string;

  @OneToOne(type => Person, user => User)
  @JoinColumn()
  person: Person;

}



