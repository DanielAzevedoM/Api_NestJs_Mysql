import { IsUserAlreadyExist } from "src/validators/user/verifyEmailExists.validator";

//Falta fazer validação de email.
export class UpdateUserDto {

    id:string;
    
    @IsUserAlreadyExist({ message: `Email already exists`})
    newEmail: string;
  
    newPassword: string;

}