import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '@dtoContants/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
            user: omit(user, ['password']),
        };
    }

    async register(loginUserDto: CreateUserDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
            loginUserDto.password,
            saltRounds
        );
        const createdUser = await this.userService.create({
            ...loginUserDto,
            password: hashedPassword,
        });
        return createdUser;
    }
}
