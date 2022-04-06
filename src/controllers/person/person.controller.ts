import { Body, Controller, Delete,Get,Param, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from 'src/dtos/person/person.dto';
import { UpdatePersonDto } from 'src/dtos/person/person.update.dto';
import { PersonService } from 'src/services/person/person.service';


@Controller(':userId/person/')
export class PersonController {

    constructor( private readonly personService: PersonService ){}

    @Post()
    async create(@Param() param,@Body() createPersonDto: CreatePersonDto){

        await this.personService.remove(param.userId);
        const person = await this.personService.create(createPersonDto);
        await this.personService.updateFk(param.userId, person);

        return person;
    }

    @Get(':id')
    findOne(@Param() params) {
        return this.personService.findOne(params);
    }

    @Put(':id')
    update(@Param() params, @Body() UpdatePersonDto: UpdatePersonDto) {
       return this.personService.update(params, UpdatePersonDto);
    }


    @Delete(':id')
    remove(@Param() params) {
        return this.personService.remove(params);
    }
}
