import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false, collection: 'persons' })
export class Person {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    accountid: string;

    @Prop({ type: Number })
    aged: number;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);
