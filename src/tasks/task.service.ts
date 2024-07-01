import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

    ) { }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const task = await this.taskRepository.create(createTaskDto);
            return this.taskRepository.save(task);
        } catch (error) {
            console.error('Error creating task:', error);
            throw new InternalServerErrorException('Could not create task');
        }
    }

    async findAll(): Promise<Task[]> {
        try {
            return await this.taskRepository.find();
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error fetching tasks:', error);
            // Throw a more descriptive internal server error
            throw new InternalServerErrorException('Error fetching tasks');
        }
    }

    async findOne(id: number): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });
            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
            return task;
        } catch (error) {
            // Log the error for debugging purposes
            console.error(`Error fetching task with ID ${id}:`, error);
            // Throw a more descriptive internal server error or rethrow the original error
            throw new InternalServerErrorException(`Error fetching task with ID ${id}`);
        }
    }
    async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });

            if (!task) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }

            if (updateTaskDto.title) {
                task.title = updateTaskDto.title;
            }

            if (updateTaskDto.description) {
                task.description = updateTaskDto.description;
            }
            if (updateTaskDto.completed) {
                task.completed = updateTaskDto.completed;
            }
            if (updateTaskDto.dueDate) {
                task.dueDate = updateTaskDto.dueDate;
            }
            return await this.taskRepository.save(task);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof BadRequestException) {
                throw error;
            } else {
                console.error('Error updating task:', error);
                throw new InternalServerErrorException('An error occurred while updating the task');
                //         }
            }
        }
    }



    async remove(id: number): Promise<void> {
        try {
            const result = await this.taskRepository.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException(`Task with ID ${id} not found`);
            }
        } catch (error) {

            // Log the error for debugging purposes
            console.error('Error deleting task:', error);

            // Throw a generic internal server error
            throw new InternalServerErrorException('An error occurred while deleting the task');
        }
    }



}



