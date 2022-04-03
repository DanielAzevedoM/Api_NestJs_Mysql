import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { verifyEmailExistsConstraint } from 'src/validators/user/verifyEmailExists.validator';
import { User } from '../../models/user/user.entity';
import { Person } from 'src/models/user/person.entity';
import { PersonController } from 'src/controllers/user/person.controller';
import { PersonService } from 'src/services/user/person.service';


@Module({
    imports: [TypeOrmModule.forFeature([User, Person])],
    controllers: [UserController, PersonController],
    providers: [UserService, verifyEmailExistsConstraint, PersonService],
    
  })
  export class UserModule {}