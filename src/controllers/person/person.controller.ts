import { Body, Controller, Delete,Get,Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { filter } from 'src/config/multer/multer.config';
import { CreatePersonDto } from 'src/dtos/person/person.dto';
import { UpdatePersonDto } from 'src/dtos/person/person.update.dto';
import { PersonService } from 'src/services/person/person.service';


@Controller('user/:userId/person')
export class PersonController {

    constructor( private readonly personService: PersonService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Param() params,@Body() createPersonDto: CreatePersonDto){
        await this.personService.remove(params);

        const person = await this.personService.create(params, createPersonDto);
     
        const personUpdated = await this.personService.updateFk(params.userId, person);

        return personUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findOne(@Param() params) {
        return this.personService.findOne(params);
    }   

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Param() params, @Body() UpdatePersonDto: UpdatePersonDto) {
       return this.personService.update(params, UpdatePersonDto);
    }

    @Delete()
    remove(@Param() params) {
        return this.personService.remove(params);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @UseInterceptors(FileInterceptor('image', {...filter}),
    )
    uploadFile(@Param() params,@UploadedFile() file: Express.Multer.File) {
        return this.personService.updateSelfie(params , file.path)   
    }
}
