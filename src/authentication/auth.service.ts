import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
        const { usernameOrEmail, password } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: [
                { username: usernameOrEmail },
                { email: usernameOrEmail },
            ],
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);

        return { access_token };
    }
}
