import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database.module';
import { UserModule } from '@modules/user/user.module';
import { XmlModule } from '@modules/xml/xml.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        DatabaseModule,
        UserModule,
        XmlModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
