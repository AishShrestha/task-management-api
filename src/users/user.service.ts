import { BadRequestException, Body, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Role } from 'src/roles/role.entity';



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,

    ) { }

    async create(createUserDto: CreateUserDto): Promise<{ id: number; username: string }> {
        try {
            // Hash the password before creating the user entity
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

            //  Retrieve roles using the provided role IDs
            const roles = await this.roleRepository.find({
                where: {
                    id: In(createUserDto.roleIds),
                }
            })


            // Replace the plain password with the hashed password  and set roles
            const userWithHashedPassword = { ...createUserDto, password: hashedPassword, roles };

            // Create the user entity
            const user = this.userRepository.create(userWithHashedPassword);

            // Save the user entity
            const savedUser = await this.userRepository.save(user);
            console.log(savedUser);

            // Extract and return only the id and username
            return {
                id: savedUser.id,
                username: savedUser.username,

            };
        } catch (error) {
            // Log the error (optional)
            console.error(error);

            // Throw a generic internal server error
            throw new InternalServerErrorException('An error occurred while creating the user');
        }
    }

    async findAll(): Promise<Partial<User>[]> {
        try {
            console.log(process.env.DB_HOST);
            const users = await this.userRepository
                .createQueryBuilder('user')
                .select(['user.id', 'user.username', 'user.email'])
                .getMany();
            return users;

        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error fetching users:', error);

            // Throw a generic internal server error
            throw new InternalServerErrorException('An error occurred while fetching users');
        }
    }

    async findOne(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new InternalServerErrorException('An error occurred while fetching the user');
        }
    }


    async remove(id: number): Promise<void> {
        try {
            const result = await this.userRepository.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
        } catch (error) {

            // Log the error for debugging purposes
            console.error('Error deleting user:', error);

            // Throw a generic internal server error
            throw new InternalServerErrorException('An error occurred while deleting the user');
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            if (updateUserDto.username) {
                user.username = updateUserDto.username;
            }

            if (updateUserDto.password) {
                user.password = updateUserDto.password;
            }

            return await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof BadRequestException) {
                throw error;
            } else {
                console.error('Error updating user:', error);
                throw new InternalServerErrorException('An error occurred while updating the user');
            }
        }
    }





}
