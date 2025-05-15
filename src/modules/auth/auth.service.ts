import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '@dtoContants/register-user.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateAuthIdWithAuth0(authId: string): Promise<boolean> {
        const domain = this.configService.get<string>('AUTH0_DOMAIN');
        const clientID = this.configService.get<string>('AUTH0_CLIENT_ID');
        const clientSecret = this.configService.get<string>('AUTH0_CLIENT_SECRET');
        if (!domain || !clientID || !clientSecret) {
            throw new UnauthorizedException('Auth0 configuration missing');
        }
        try {
            const tokenResponse = await axios.post(`https://${domain}/oauth/token`, {
                client_id: clientID,
                client_secret: clientSecret,
                audience: `https://${domain}/api/v2/`,
                grant_type: 'client_credentials'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const managementToken = tokenResponse.data.access_token;
            const userResponse = await axios.get(
                `https://${domain}/api/v2/users/${encodeURIComponent(authId)}`,
                {
                    headers: {
                        Authorization: `Bearer ${managementToken}`,
                    },
                }
            );
            return userResponse.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return false;
            }
            console.error('Error validating Auth0 user:', error.response?.data || error.message);
            throw new UnauthorizedException('Error validating Auth0 user');
        }
    }

    async loginWithAuthId(authId: string) {
        const authUser: any = await this.validateAuthIdWithAuth0(authId);
        if (!authUser) {
            await this.userService.removeByQuery({ email: authId });
            throw new UnauthorizedException('Invalid Auth0 user');
        }

        let user = await this.userService.findByEmail(authId);
        if (!user) {
            user = await this.register({
                email: authId,
                firstName: authUser?.nickname || '',
                lastName: '',
                password: authId,
            });
        }

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
            user: omit(user, ['password']),
        };
    }

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
