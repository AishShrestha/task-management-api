import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get('/get-all-users')
    getAllUsers() {
        return this.userService.findAll();
    }
    @Post('/create-user')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @UseGuards(AuthGuard)
    @Get('/get-user/:id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }
    @UseGuards(AuthGuard)
    @Delete('/delete-user/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Patch('/update-user/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}