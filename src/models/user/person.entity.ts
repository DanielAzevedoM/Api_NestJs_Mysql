import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Person {
  
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @OneToOne(type => User, person => Person)
  user: User;

 
}



