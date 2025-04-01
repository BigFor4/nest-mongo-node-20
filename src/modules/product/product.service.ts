import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class ProductService extends BaseService<ProductDocument> {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<ProductDocument>,
    ) {
        super(productModel);
    }
    async findAll(name?: string): Promise<ProductDocument[]> {
        return this.productModel.find({ name });
    }
}
