import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';
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

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password!: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ default: false })
    is_deleted?: boolean;
}
