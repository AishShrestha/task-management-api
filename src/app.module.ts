// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TaskModule } from './tasks/task.module';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from './typeorm.config';
import { AuthModule } from './authentication/auth.module';
import { RoleModule } from './roles/role.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables from .env file
    TypeOrmModule.forRoot(dataSourceOptions), // Provide dataSourceOptions for TypeORM configuration

    JwtModule.register({
      secret: 'your-secret-key', // Use a strong secret key
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    TaskModule,
    AuthModule,
    RoleModule,
  ],
})
export class AppModule { }

