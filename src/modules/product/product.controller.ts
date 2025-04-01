import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { BaseController } from '@base/base.controller';
import { ProductDocument } from './schemas/product.schema';

@Controller('products')
export class ProductController extends BaseController<ProductDocument> {
    constructor(private readonly productService: ProductService) {
        super(productService);
    }
    @Get()
    async findAll(@Query('name') name?: string): Promise<ProductDocument[]> {
        if (name) {
            return this.productService.findAll(name);
        }
        return this.productService.findAll();
    }
}
