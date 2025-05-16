import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DelTableController } from './del-table.controller';
import { DelTableService } from './del-table.service';
import { Table, TableSchema } from '../modules/table/schemas/table.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    ],
    controllers: [DelTableController],
    providers: [DelTableService],
})
export class DelTableModule {}
