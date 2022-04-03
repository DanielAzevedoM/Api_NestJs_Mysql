import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';


@Entity() 
export class User  {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string

  @Column()
  password: string;


  @JoinColumn()
  @OneToOne(type => Person, user => User)
  person: Person
}



