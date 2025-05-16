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

    async findAll(): Promise<any> {
        const tables = await this.tableModel.find().lean();
        const result = {};
        tables.map((table) => {
            const { room, uuid } = table;
            result[room] = result[room] || {};
            result[room][uuid] = result[room][uuid] || {};
            result[room][uuid] = table;
        });
        return result;
    }
}
