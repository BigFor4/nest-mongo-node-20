import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Table, TableSchema } from './schemas/table.schema';
import { JwtConfig } from '@configs/jwt.config';

@Module({
    imports: [
        JwtConfig,
        MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    ],
    controllers: [TableController],
    providers: [TableService],
    exports: [],
})
export class TableModule {}
