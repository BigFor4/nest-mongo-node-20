import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as Joi from 'joi';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../../dtoContants/register-user.dto';
import { UserDocument } from '@modules/user/schemas/user.schema';

const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: LoginUserDto })
    async login(@Body() body: LoginUserDto) {
        const { error } = LoginSchema.validate(body);
        if (error) throw error;
        return this.authService.login(body.email, body.password);
    }
    
    @Post()
    @ApiOperation({ summary: 'register' })
    @ApiBody({ type: CreateUserDto })
    async register(@Body() body: CreateUserDto): Promise<UserDocument> {
        const CreateUserSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error } = CreateUserSchema.validate(body);
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }

        return this.authService.register(body);
    }
}
