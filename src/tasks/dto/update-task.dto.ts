import { IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @IsDate()
    dueDate?: Date;
}
