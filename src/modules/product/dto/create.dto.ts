import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userTypeID!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    parentId!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: Object })
    allTextRow!: object;

    @IsArray()
    @IsOptional()
    @ApiProperty({ type: [Object], required: false })
    assetCrossReference?: object[];
}
