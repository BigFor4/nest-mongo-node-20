import { Controller, Get, Query } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { BaseController } from '@base/base.controller';
import { ClassificationDocument } from './schemas/classification.schema';

@Controller('classifications')
export class ClassificationController extends BaseController<ClassificationDocument> {
    constructor(private readonly classificationService: ClassificationService) {
        super(classificationService);
    }
    @Get()
    async findAll(@Query('name') name?: string): Promise<ClassificationDocument[]> {
        if (name) {
            return this.classificationService.findAll(name);
        }
        return this.classificationService.findAll();
    }
}
