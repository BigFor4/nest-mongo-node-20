import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: ObjectId, auto: true })
    _id: ObjectId;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    is_deleted: boolean;

    @Prop({ default: false })
    is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
