import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagmapController } from './tagmap.controller';
import { TagmapService } from './tagmap.service';
import { Schema } from 'mongoose';

const MetaSchema = new Schema({
    tag: { type: String, required: true, unique: true },
    meta: { type: Schema.Types.Mixed, required: true },
});

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Meta', schema: MetaSchema }]),
    ],
    controllers: [TagmapController],
    providers: [TagmapService],
})
export class TagmapModule {}
