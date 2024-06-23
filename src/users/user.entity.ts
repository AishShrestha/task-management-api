import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { OTP } from '../users/otp.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: false })
    status: boolean;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @OneToMany(() => OTP, otp => otp.user)
    otps: OTP[];
}