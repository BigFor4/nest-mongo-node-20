import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './schemas/table.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class TableService extends BaseService<TableDocument> {
    constructor(
        @InjectModel(Table.name)
        private tableModel: Model<TableDocument>
    ) {
        super(tableModel);
    }
}
