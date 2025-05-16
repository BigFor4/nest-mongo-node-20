import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import {
    Registry,
    RegistrySchema,
} from '../modules/registry/schemas/registry.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Registry.name, schema: RegistrySchema },
        ]),
    ],
    controllers: [HistoryController],
    providers: [HistoryService],
})
export class HistoryModule {}
