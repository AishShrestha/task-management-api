import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
    @IsString()
    usernameOrEmail: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}