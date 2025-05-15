import { Controller } from '@nestjs/common';
import { MetaService } from './meta.service';
import { BaseController } from '@base/base.controller';
import { MetaDocument } from './schemas/meta.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meta')
@Controller('metas')
export class MetaController extends BaseController<MetaDocument> {
    constructor(private readonly metaService: MetaService) {
        super(metaService);
    }
}
