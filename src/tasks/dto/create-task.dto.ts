import { Type } from 'class-transformer';
import { IsNotEmpty, IsBoolean, IsOptional, IsDate, IsInt, Min } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;

    @IsOptional()
    @Type(() => Date)
    dueDate?: Date;

    @IsInt()
    @Min(1)
    userId: number;
}