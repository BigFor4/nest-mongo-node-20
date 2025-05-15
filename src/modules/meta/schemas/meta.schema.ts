import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: false, collection: 'meta', strict: false })
export class Meta {
    @Prop({ type: String, required: true })
    id: string;
}

export type MetaDocument = Meta & Document;
export const MetaSchema = SchemaFactory.createForClass(Meta);
