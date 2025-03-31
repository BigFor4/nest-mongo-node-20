import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classification, ClassificationDocument } from './schemas/classification.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class ClassificationService extends BaseService<ClassificationDocument> {
    constructor(
        @InjectModel(Classification.name)
        private classificationModel: Model<ClassificationDocument>,
    ) {
        super(classificationModel);
    }
    async findAll(name?: string): Promise<ClassificationDocument[]> {
        return this.classificationModel.find({ name });
    }
}
