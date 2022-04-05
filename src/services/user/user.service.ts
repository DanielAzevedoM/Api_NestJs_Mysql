import { Injectable, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User as UserEntity} from '../../models/user/user.entity';
import { User } from '../../interfaces/user/user.interface';
import { updateUser } from 'src/interfaces/user/update-user.interface'
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,

      ){}

    create(user: User): Promise<UserEntity>{
        return this.userRepository.save(user);
    }
    
    findAll(): Promise<UserEntity[]> {     
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne(id);

        if(!findUser){
            console.log("User not exists!")
        }

        return findUser;
    }

    async update(id: string, user: updateUser): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne(id)

        if(!findUser){
            return null
        }

        const userUpdate = {
            ...findUser,
            email: user.newEmail,
            password: user.newPassword
        }

         return this.userRepository.save(userUpdate);    
    }


    async remove(id: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne(id);

        if(!findUser){
            console.log("User not exists")

            return
        }

        return this.userRepository.remove(findUser);
    }

    async verifyEmailExists(email: string): Promise<UserEntity>{
        const findUser = await this.userRepository.findOne({ where: { email}}) ;

        return findUser;
    }

}
