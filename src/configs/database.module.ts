import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    uri: configService.get<string>('DATABASE_URI'),
                    user: configService.get<string>('DATABASE_USERNAME'),
                    pass: configService.get<string>('DATABASE_PASSWORD'),
                };
            },
        }),
    ],
})
export class DatabaseModule {}
