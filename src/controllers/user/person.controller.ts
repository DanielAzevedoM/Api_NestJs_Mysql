import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from 'src/dtos/user/person.dto';
import { PersonService } from 'src/services/user/person.service';
import { UserService  } from 'src/services/user/user.service';

@Controller('user/person/:id')
export class PersonController {

    constructor(
        private readonly personService: PersonService,
        private readonly userService: UserService){}

    @Post()
    async create(@Param() param,@Body() createPersonDto: CreatePersonDto){

        const person = await this.personService.create(createPersonDto)
        await this.userService.updatePerson(param.id, person)


        return person;
    }

    // @Get()
    // async findAll(): Promise<User[]> {
    //   return this.userService.findAll();
    // }

    // @Get(':id')
    //  findOne(@Param() params) {
    //     return this.userService.findOne(params.id);
    // }

    // @Put(':id')
    // update(@Param() param, @Body() updateUserDto: UpdateUserDto) {
    //    return this.userService.update(param, updateUserDto);
    // }


    // @Delete(':id')
    // remove(@Param() params) {
    //     return this.userService.remove(params.id);
    // }
}
