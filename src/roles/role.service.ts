import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async createRole(role: Role): Promise<Role> {
        return this.rolesRepository.save(role);
    }

    async getAllRoles(): Promise<Role[]> {
        return this.rolesRepository.find();
    }
}
