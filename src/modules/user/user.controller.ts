import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BaseController } from '@base/base.controller';
import { UserDocument } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController extends BaseController<UserDocument> {
    constructor(private readonly userService: UserService) {
        super(userService);
    }
    @Get()
    async findAll(@Query('name') name?: string): Promise<UserDocument[]> {
        if (name) {
            return this.userService.findAll(name);
        }
        return this.userService.findAll();
    }
}
