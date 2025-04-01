import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ required: true, type: String })
    userTypeID: string;

    @Prop({ type: String })
    parentId: string;

    @Prop({ type: [Object], default: {} })
    assetCrossReference?: object[];

    @Prop({ type: String })
    allTextRow: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
