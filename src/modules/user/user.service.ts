import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class UserService extends BaseService<UserDocument> {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {
        super(userModel);
    }
    async findAll(name?: string): Promise<UserDocument[]> {
        return this.userModel.find({ name });
    }
}
