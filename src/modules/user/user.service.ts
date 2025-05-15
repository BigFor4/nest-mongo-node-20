import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BaseService } from '@base/base.service';
import { CreateUserDto } from '@dtoContants/register-user.dto';

@Injectable()
export class UserService extends BaseService<UserDocument> {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        if (!email) {
            throw new Error('Email must be provided');
        }
        return this.userModel.findOne({ email }).lean();
    }

    async create(loginUserDto: CreateUserDto) {
        const createdUser = await this.userModel.create(loginUserDto);
        return createdUser;
    }
}
