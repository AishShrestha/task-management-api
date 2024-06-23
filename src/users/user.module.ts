import { Module } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UserController } from './user.controllers';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';




@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, UserModule],
})
export class UserModule { }