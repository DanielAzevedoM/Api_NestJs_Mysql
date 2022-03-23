import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { verifyEmailExistsConstraint } from 'src/validators/user/verifyEmailExists.validator';
import { User } from '../../entitys/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, verifyEmailExistsConstraint],
    
  })
  export class UserModule {}