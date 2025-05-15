import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from '@base/base.controller';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindByEmailDto } from './dto/findByEmail.dto';
import Joi from 'joi';
import { AuthGuardConfig } from '@configs/guard.config';

@ApiTags('User')
@Controller('users')
export class UserController extends BaseController<UserDocument> {
    constructor(private readonly userService: UserService) {
        super(userService);
    }
    @Post('findByEmail')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    @ApiOperation({ summary: 'Find user by email' })
    @ApiBody({ type: FindByEmailDto })
    async findByEmail(@Body() body: FindByEmailDto): Promise<UserDocument> {
        const FindByEmailSchema = Joi.object({
            email: Joi.string().email().required(),
        });
        const { error } = FindByEmailSchema.validate(body);
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }
        return this.userService.findByEmail(body.email);
    }
}
