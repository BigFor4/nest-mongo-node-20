import { Controller, Get } from '@nestjs/common';
import { TableService } from './table.service';
import { BaseController } from '@base/base.controller';
import { TableDocument } from './schemas/table.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Table')
@Controller('tables')
export class TableController extends BaseController<TableDocument> {
    constructor(private readonly tableService: TableService) {
        super(tableService);
    }
    @Get()
    findAll() {
        return this.tableService.findAll();
    }
}
