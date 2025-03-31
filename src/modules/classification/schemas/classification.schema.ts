import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassificationDocument = Classification & Document;

@Schema({ timestamps: true })
export class Classification {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ required: true, type: String })
    user_type: string;

    @Prop({ required: true, type: String })
    parent_id: string;

    @Prop({ required: true, type: Object })
    name: Record<string, any>;

    @Prop({ type: Object, default: {} })
    meta_data?: Record<string, any>;
    @Prop({ type: [String] })
    attribute_link: string[];
}

export const ClassificationSchema = SchemaFactory.createForClass(Classification);
