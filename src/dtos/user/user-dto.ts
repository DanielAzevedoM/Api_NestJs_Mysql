import {   IsEmail, IsNotEmpty, validate } from "class-validator";
import { IsUserAlreadyExist } from "src/validators/user/verifyEmailExists.validator";
import {  PrimaryGeneratedColumn } from "typeorm";

export class CreateUserDto {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsEmail({}, { message: 'Invalid email'})
    @IsUserAlreadyExist({ message: `Email already exists`})
    email: string

    @IsNotEmpty({ message: 'Password required'})
    password: string;
}


//Falta fazer validação de email.
export class UpdateUserDto {

    id:number;

    @IsUserAlreadyExist({ message: `Email already exists`})
    newEmail: string;
  
    newPassword: string;



}