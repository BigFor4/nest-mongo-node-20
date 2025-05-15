import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false })
export class Registry {
    @Prop({ type: String, required: true })
    id: string;

    @Prop({ type: String })
    surgeon: string;

    @Prop({ type: String })
    operation: string;

    @Prop({ type: String })
    elapsedTime: string;

    @Prop({ type: Number })
    count: number;

    @Prop({ type: Number })
    missing: number;

    @Prop({ type: Number })
    used: number;

    @Prop({ type: Number })
    unused: number;

    @Prop({ type: [Object], default: [] })
    tags: Record<string, any>[];

    @Prop({ type: String })
    class: string;

    @Prop({ type: Date })
    lastTime: Date;

    @Prop({ type: Date })
    endTime: Date;

    @Prop({ type: Date })
    startTime: Date;

    @Prop({ type: String })
    state: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export type RegistryDocument = Registry & Document;
export const RegistrySchema = SchemaFactory.createForClass(Registry);
