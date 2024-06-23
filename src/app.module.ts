// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TaskModule } from './tasks/task.module';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from './typeorm.config';
import { AuthModule } from './authentication/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),

    JwtModule.register({
      secret: 'your-secret-key', // Use a strong secret key
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    TaskModule,
    AuthModule
  ],
})
export class AppModule { }

