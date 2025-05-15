import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meta, MetaDocument } from './schemas/meta.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class MetaService extends BaseService<MetaDocument> {
    constructor(
        @InjectModel(Meta.name)
        private metaModel: Model<MetaDocument>
    ) {
        super(metaModel);
    }
}
