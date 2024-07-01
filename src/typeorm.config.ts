
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { OTP } from './users/otp.entity';
import { Role } from './roles/role.entity';
import { DBconfig } from './config/db.config';
import { join } from 'path';


const dbConfig = new DBconfig();


// export const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: dbConfig.getHost(),
//     port: parseInt(dbConfig.getPort()),
//     username: dbConfig.getUsername(),
//     password: dbConfig.getPassword(),
//     database: dbConfig.getDatabase(),

// }

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 6969, // Default PostgreSQL port
    username: 'postgres',
    password: 'kanekiken',
    database: 'TaskManagement',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: false, // Set to false to use migrations
    logging: true,
    migrations: ['../src/migrations/*.ts'],

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
