import { Controller } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { BaseController } from '@base/base.controller';
import { RegistryDocument } from './schemas/registry.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registry')
@Controller('registry')
export class RegistryController extends BaseController<RegistryDocument> {
    constructor(private readonly registryService: RegistryService) {
        super(registryService);
    }
}
