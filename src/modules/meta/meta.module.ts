import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetaService } from './meta.service';
import { MetaController } from './meta.controller';
import { Meta, MetaSchema } from './schemas/meta.schema';
import { JwtConfig } from '@configs/jwt.config';

@Module({
    imports: [
        JwtConfig,
        MongooseModule.forFeature([{ name: Meta.name, schema: MetaSchema }]),
    ],
    controllers: [MetaController],
    providers: [MetaService],
    exports: [MetaService],
})
export class MetaModule {}
