import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user/user-dto';
import { UserService } from 'src/services/user/user.service';
import { User } from '../../interfaces/user/user.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto)
        return this.userService.create(createUserDto)
    }

    @Get()
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
     findOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    @Put(':id')
    update(@Param() param, @Body() updateUserDto: UpdateUserDto) {
        console.log(updateUserDto)
       return this.userService.update(param, updateUserDto);
    }


    @Delete(':id')
    remove(@Param() params) {
        return this.userService.remove(params.id);
    }
}
