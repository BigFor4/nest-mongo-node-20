import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'tables' })
export class Table {
    @Prop({ type: String, required: true })
    uuid: string;

    @Prop({ type: Number })
    power: number;

    @Prop({ type: Number })
    missing: number;

    @Prop({ type: String })
    ip: string;

    @Prop({ type: String })
    cmd: string;

    @Prop({ type: [Number] })
    ports: number[];

    @Prop({ type: String })
    dfUrl: string;

    @Prop({ type: Boolean })
    state: boolean;

    @Prop({ type: String })
    msgtype: string;

    @Prop({ type: String })
    mode: string;

    @Prop({ type: String })
    readerIp: string;

    @Prop({ type: String })
    table: string;

    @Prop({ type: Number })
    dwell: number;

    @Prop({ type: String })
    name: string;

    @Prop({ type: Number })
    port: number;

    @Prop({ type: String })
    room: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export type TableDocument = Table & Document;
export const TableSchema = SchemaFactory.createForClass(Table);
