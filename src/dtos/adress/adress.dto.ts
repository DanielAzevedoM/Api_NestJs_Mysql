import { IsNotEmpty } from "class-validator";

export class CreateAdressDto {
   
    id: string;

    @IsNotEmpty()
    adress: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    postalCode: number;
    
    @IsNotEmpty()
    country: string;
  
  }
  
  
  
  