import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registry } from '../modules/registry/schemas/registry.schema';

@Controller('delete')
export class DeleteController {
    constructor(
        @InjectModel(Registry.name)
        private readonly registryModel: Model<Registry>
    ) {}

    @Get()
    async deleteMany(@Query() query: any) {
        // Delete many from registry collection, using query params as filter
        const filter = { ...query };
        const result = await this.registryModel.deleteMany(filter);
        return { deletedCount: result.deletedCount };
    }
}
