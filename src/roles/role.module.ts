import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { User } from 'src/users/user.entity';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';
import { UserModule } from 'src/users/user.module';
import { UserController } from 'src/users/user.controllers';
import { UserService } from 'src/users/user.service';


@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RoleModule { }