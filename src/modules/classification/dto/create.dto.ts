import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassificationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    user_type!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    parent_id!: string;

    @IsObject()
    @IsNotEmpty()
    @ApiProperty({ type: Object })
    name!: object;

    @IsObject()
    @IsOptional()
    @ApiProperty({ type: Object, required: false })
    meta_data?: object;
}
