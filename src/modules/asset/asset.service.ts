import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asset, AssetDocument } from './schemas/asset.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class AssetService extends BaseService<AssetDocument> {
    constructor(
        @InjectModel(Asset.name)
        private assetModel: Model<AssetDocument>,
    ) {
        super(assetModel);
    }
    async findAll(name?: string): Promise<AssetDocument[]> {
        return this.assetModel.find({ name });
    }
}
