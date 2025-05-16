import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from '../modules/table/schemas/table.schema';

@Injectable()
export class DelTableService {
    constructor(
        @InjectModel(Table.name)
        private readonly tableModel: Model<TableDocument>
    ) {}

    async deleteTableByUuid(uuid: string): Promise<any> {
        // Delete all tables with the given uuid
        const result = await this.tableModel.deleteMany({ uuid });
        return { deletedCount: result.deletedCount };
    }
}
