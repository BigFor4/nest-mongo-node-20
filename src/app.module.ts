import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database.module';
import { ClassificationModule } from '@modules/classification/classification.module';
import { XmlModule } from '@modules/xml/xml.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseModule,
        ClassificationModule,
        XmlModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
