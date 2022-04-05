import { Body, Controller, Delete,Get,Param, Post } from '@nestjs/common';
import { CreatePersonDto } from 'src/dtos/person/person.dto';
import { Person } from 'src/interfaces/person/person.interface';
import { PersonService } from 'src/services/person/person.service';
import { UserService  } from 'src/services/user/user.service';

@Controller(':userId/person/')
export class PersonController {

    constructor(
        private readonly personService: PersonService,
        private readonly userService: UserService){}

    @Post()
    async create(@Param() param,@Body() createPersonDto: CreatePersonDto){

        await this.personService.remove(param.userId);
        const person = await this.personService.create(createPersonDto);
        await this.personService.updateFk(param.userId, person);

        return person;
    }

    @Get(':id')
    async findOne(@Param() params) {
        return this.personService.findOne(params);
    }

    // @Get(':id')
    //  findOne(@Param() params) {
    //     return this.userService.findOne(params.id);
    // }

    // @Put(':id')
    // update(@Param() param, @Body() updateUserDto: UpdateUserDto) {
    //    return this.userService.update(param, updateUserDto);
    // }


    @Delete(':id')
    remove(@Param() params) {
        return this.personService.remove(params);
    }
}
