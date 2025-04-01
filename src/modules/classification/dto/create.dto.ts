import { IsNotEmpty, IsString, IsObject, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassificationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userTypeId!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    parentId!: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ type: [Object] })
    name!: object[];

    @IsOptional()
    @IsObject()
    @ApiProperty({ type: Object, required: false })
    metadata?: object;

    @IsString()
    @IsOptional()
    @ApiProperty()
    referenced?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    allTextRow?: string;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [String] })
    attributeLink?: string[];
}
