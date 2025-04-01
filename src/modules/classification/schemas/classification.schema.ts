import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClassificationDocument = Classification & Document;

@Schema({ timestamps: true })
export class Classification {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ type: Object })
    name: object[];

    @Prop({ type: String })
    parentId: string;

    @Prop({ type: String })
    userTypeID: string;

    @Prop({ type: String })
    referenced: string;

    @Prop({ type: [String] })
    attributeLink: string[];

    @Prop({ type: Object, default: {} })
    metadata?: object;

    @Prop({ type: String })
    allTextRow: string;
}

export const ClassificationSchema = SchemaFactory.createForClass(Classification);
