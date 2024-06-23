import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;

    @IsEmail()
    @IsNotEmpty()
    email?: string;
}