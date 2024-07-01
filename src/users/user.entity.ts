import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { OTP } from '../users/otp.entity';
import { Role } from 'src/roles/role.entity';

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

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_roles_role', // Corrected the name to match your migration
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];
}
