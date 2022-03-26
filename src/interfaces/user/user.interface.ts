export interface User {
    id: number;
    email:string;
    password: string;
   

}

//Perguntar se isso é correto.
export interface updateUser {

    id: number;
    newEmail?:string;
    newPassword?: string;


}