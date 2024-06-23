
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { OTP } from './users/otp.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 6969, // Default PostgreSQL port
    username: 'postgres',
    password: 'kanekiken',
    database: 'Task Management db',
    entities: [User, Task, OTP],
    synchronize: false, // Set to false to use migrations
    logging: true,
    migrations: ['src/migrations/*.ts'],

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
