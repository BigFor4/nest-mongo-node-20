import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password!: string;

    @IsBoolean()
    @ApiProperty({ default: false })
    is_deleted?: boolean;

    @IsBoolean()
    @ApiProperty({ default: false })
    is_admin?: boolean;
}

export class UpdateUserDto {
    @IsString()
    @ApiProperty()
    first_name?: string;

    @IsString()
    @ApiProperty()
    last_name?: string;

    @IsString()
    @ApiProperty()
    email?: string;

    @IsString()
    @ApiProperty()
    password?: string;

    @IsBoolean()
    @ApiProperty({ default: false })
    is_deleted?: boolean;

    @IsBoolean()
    @ApiProperty({ default: false })
    is_admin?: boolean;
}
