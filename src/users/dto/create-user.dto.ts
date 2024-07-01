import { IsString, IsNotEmpty, IsEmail, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    roleIds: string[];


}