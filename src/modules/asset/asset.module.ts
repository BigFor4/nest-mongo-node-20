import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { Asset, AssetSchema } from './schemas/asset.schema';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Asset.name,
                useFactory: async (configService: ConfigService) => {
                    const collectionName =
                        configService.get<string>('COLLECTION_NAME_ASSET') || 'assets';
                    const schema = AssetSchema;
                    schema.set('collection', collectionName);
                    return schema;
                },
                inject: [ConfigService],
            },
        ]),
        ConfigModule.forRoot(),
    ],
    controllers: [AssetController],
    providers: [AssetService],
    exports: [
        AssetService,
        MongooseModule.forFeatureAsync([
            {
                name: Asset.name,
                useFactory: async (configService: ConfigService) => {
                    const collectionName =
                        configService.get<string>('COLLECTION_NAME_ASSET') || 'assets';
                    const schema = AssetSchema;
                    schema.set('collection', collectionName);
                    return schema;
                },
                inject: [ConfigService],
            },
        ]),
    ],
})
export class AssetModule {}
