import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person as PersonEntity } from 'src/models/user/person.entity'; 
import { Person } from 'src/interfaces/user/person.interface';
import { User as UserEntity} from 'src/models/user/user.entity';

@Injectable()
export class PersonService {
    constructor(
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

     create(person: Person): Promise<PersonEntity>{
     
       return this.personRepository.save(person)
       
    }  

    linkUser(id: string, person: Person){

    }


}
