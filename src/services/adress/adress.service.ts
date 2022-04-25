import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress as AdressEntity } from 'src/models/adress/adress.entity';
import { Person as PersonEntity } from 'src/models/person/person.entity';
import { Adress } from 'src/interfaces/adress/adress.interface';
import { UpdateAdress } from 'src/interfaces/adress/adress.update.interface';



@Injectable()
export class AdressService {
    constructor(
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(AdressEntity) private readonly adressRepository: Repository<AdressEntity>
    ){}

    async create(params, adress: Adress): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne({ id: params.personId})

		if(!findPerson) return null;
       
        return this.adressRepository.save(adress);
    }
    
    async updateFk(params, adress: Adress): Promise<AdressEntity> {   
        const findPerson = await this.personRepository.findOne({ id: params.personId})

        const updateFk = {
            ...adress,
            personId: findPerson.id

        }

        return this.adressRepository.save(updateFk)
    }

    async findAllByPersonId(params): Promise<AdressEntity[]>{
        const findPerson = await this.personRepository.findOne({ id: params.personId})

        const findAdress = await this.adressRepository.find({ personId: findPerson.id })
      
		if(!findPerson) return null;

        return findAdress;
    }

    async findOne(params): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne({ id: params.personId})

        const findAdress = await this.adressRepository.findOne({ id: params.id})

		if(!findPerson) return null;
        
        return findAdress;
    }

    async update(params, adress: UpdateAdress): Promise<AdressEntity>{ 
        const findPerson = await this.personRepository.findOne({ id: params.personId})

        const findAdress = await this.adressRepository.findOne({ id: params.id})

		if(!findPerson) return null;

        const adressUpdate = {
            ...findAdress,
            adress: adress.newAdress,
            city: adress.newCity,
            state: adress.newState,
            postalCode: adress.newPostalCode,
            country: adress.newCountry,
        }

         return this.adressRepository.save(adressUpdate);    
    }

    async remove(params): Promise<AdressEntity>{
        const findPerson = await this.personRepository.findOne({ id: params.personId})

        const findAdress = await this.adressRepository.findOne({ id: params.id})
        
		if(!findPerson) return null;

        return this.adressRepository.remove(findAdress);
    }    
}
