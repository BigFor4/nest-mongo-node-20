import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeleteController } from './delete.controller';
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
    controllers: [DeleteController],
})
export class DeleteModule {}
