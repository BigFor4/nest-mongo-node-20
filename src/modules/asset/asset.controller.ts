import { Controller, Get, Query } from '@nestjs/common';
import { AssetService } from './asset.service';
import { BaseController } from '@base/base.controller';
import { AssetDocument } from './schemas/asset.schema';

@Controller('assets')
export class AssetController extends BaseController<AssetDocument> {
    constructor(private readonly assetService: AssetService) {
        super(assetService);
    }
    @Get()
    async findAll(@Query('name') name?: string): Promise<AssetDocument[]> {
        if (name) {
            return this.assetService.findAll(name);
        }
        return this.assetService.findAll();
    }
}
