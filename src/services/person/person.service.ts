import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person as PersonEntity } from 'src/models/person/person.entity'; 
import { Person } from 'src/interfaces/person/person.interface';
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

    async updateFk(id: string, person: Person): Promise<UserEntity>{
		const findUser = await this.userRepository.findOne(id)

		if(!findUser) return null;

		const userUpdate = {
			...findUser,
			person: person,
		
		}

		return this.userRepository.save(userUpdate);    
    }


    async remove(params): Promise<PersonEntity>{
		const findUser = await this.userRepository.findOne(params.userId);

		const findPerson = await this.personRepository.findOne(findUser.personId);

		if(!findUser) { 
			console.log("User not exists")
			return null;  
		}

		if(!findPerson) { 
			console.log("Person not exists") 
			return null; 
		} 
	
		const userUpdate = {
			...findUser,
			personId: null
		}

		await this.userRepository.save(userUpdate);

		return this.personRepository.remove(findPerson);	
	}

	async findOne(params): Promise<PersonEntity>{
		const findUser = await this.userRepository.findOne(params.userId);

		const findPerson = await this.personRepository.findOne(params.id);

		if(!findUser) return null;
		if(!findPerson) return null;
	

		return findPerson;
	}

}


