import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateAssetDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ nullable: true })
    objectTypeID?: string | null;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetpath_thumbnail?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetStatus?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetversion?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetversionthumbnail?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetpath?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_assetstatusthumbnail?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_extension?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_pixelWidth?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_profile?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_samples?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_depth?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_colorspace?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_pixelHeight?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_size?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_compression?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_uploaded?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_class?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    asset_format?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_filename?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    'asset.mime-type'?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    'asset.uploaded'?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    'asset.size'?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    'asset.filename'?: string;

    @Transform(({ value }) => (typeof value === 'object' ? JSON.stringify(value) : value))
    @IsOptional()
    @ApiProperty()
    att_approvalstatus?: object | string;

    @Transform(({ value }) => (typeof value === 'object' ? JSON.stringify(value) : value))
    @IsOptional()
    @ApiProperty()
    att_AssetDescription?: string | object;

    @IsString()
    @IsOptional()
    @ApiProperty()
    att_CopyrightInformation?: string;

    @Transform(({ value }) => (typeof value === 'object' ? JSON.stringify(value) : value))
    @IsOptional()
    @ApiProperty()
    att_currentrevisionlastedited?: object | string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    'att_mime-type'?: string;
}
