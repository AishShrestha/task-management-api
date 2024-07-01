import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async createRole(@Body() role: Role): Promise<Role> {
        return this.rolesService.createRole(role);
    }

    @Get()
    async getAllRoles(): Promise<Role[]> {
        return this.rolesService.getAllRoles();
    }
}
