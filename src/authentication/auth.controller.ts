import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signin')
    async signIn(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
        return this.authService.signIn(loginUserDto);

    }
}
