import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ timestamps: true })
export class Asset {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, default: null })
    objectTypeID?: string | null;

    @Prop({ type: String })
    att_assetpath_thumbnail?: string;

    @Prop({ type: String })
    att_assetStatus?: string;

    @Prop({ type: String })
    att_assetversion?: string;

    @Prop({ type: String })
    att_assetversionthumbnail?: string;

    @Prop({ type: String })
    att_assetpath?: string;

    @Prop({ type: String })
    att_assetstatusthumbnail?: string;

    @Prop({ type: String })
    asset_extension?: string;

    @Prop({ type: String })
    asset_pixelWidth?: string;

    @Prop({ type: String })
    asset_profile?: string;

    @Prop({ type: String })
    asset_samples?: string;

    @Prop({ type: String })
    asset_depth?: string;

    @Prop({ type: String })
    asset_colorspace?: string;

    @Prop({ type: String })
    asset_pixelHeight?: string;

    @Prop({ type: String })
    att_size?: string;

    @Prop({ type: String })
    asset_compression?: string;

    @Prop({ type: String })
    att_uploaded?: string;

    @Prop({ type: String })
    asset_class?: string;

    @Prop({ type: String })
    asset_format?: string;

    @Prop({ type: String })
    att_filename?: string;

    @Prop({ type: String })
    'asset.mime-type'?: string;

    @Prop({ type: String })
    'asset.uploaded'?: string;

    @Prop({ type: String })
    'asset.size'?: string;

    @Prop({ type: String })
    'asset.filename'?: string;

    @Prop({ type: Object || String })
    att_approvalstatus?: object | string;

    @Prop({ type: Object || String })
    att_AssetDescription?: string | string;

    @Prop({ type: String })
    att_CopyrightInformation?: string;

    @Prop({ type: Object || String })
    att_currentrevisionlastedited?: object | string;

    @Prop({ type: String })
    'att_mime-type'?: string;

    @Prop({ type: String })
    allTextRow: string;

    @Prop({ type: Object })
    allTextRowLanguage?: object;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
