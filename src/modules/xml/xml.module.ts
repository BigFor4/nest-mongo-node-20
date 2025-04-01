import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { XmlController } from './xml.controller';
import { XmlService } from './xml.service';
import { ProductModule } from '@modules/product/product.module';
import { ClassificationModule } from '@modules/classification/classification.module';
import { AssetModule } from '@modules/asset/asset.module';

@Module({
    imports: [MulterModule.register(), ProductModule, ClassificationModule, AssetModule],
    controllers: [XmlController],
    providers: [XmlService],
})
export class XmlModule {}
