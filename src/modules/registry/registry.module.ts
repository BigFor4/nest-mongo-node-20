import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { Registry, RegistrySchema } from './schemas/registry.schema';
import { JwtConfig } from '@configs/jwt.config';

@Module({
    imports: [
        JwtConfig,
        MongooseModule.forFeature([
            { name: Registry.name, schema: RegistrySchema },
        ]),
    ],
    controllers: [RegistryController],
    providers: [RegistryService],
    exports: [],
})
export class RegistryModule {}
