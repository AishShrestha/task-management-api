import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @UseGuards(AuthGuard)
    @Post('create-task')
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @UseGuards(AuthGuard)
    @Get('get-all-tasks')
    async findAll() {
        return this.taskService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('get-task/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch('update-task/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @UseGuards(AuthGuard)
    @Delete('delete-task/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.remove(id);
    }
}