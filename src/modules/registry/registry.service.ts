import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registry, RegistryDocument } from './schemas/registry.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class RegistryService extends BaseService<RegistryDocument> {
    constructor(
        @InjectModel(Registry.name)
        private registryModel: Model<RegistryDocument>
    ) {
        super(registryModel);
    }
}
