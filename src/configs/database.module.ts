import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DATABASE_URI || 'mongodb://localhost:27017/dam', {
            user: process.env.DATABASE_USERNAME,
            pass: process.env.DATABASE_PASSWORD,
        }),
    ],
})
export class DatabaseModule {}
