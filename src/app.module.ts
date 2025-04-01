import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database.module';
import { ClassificationModule } from '@modules/classification/classification.module';
import { XmlModule } from '@modules/xml/xml.module';
import { ProductModule } from '@modules/product/product.module';
import { AssetModule } from '@modules/asset/asset.module';
import { UserModule } from '@modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseModule,
        ClassificationModule,
        ProductModule,
        AssetModule,
        UserModule,
        XmlModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
