import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;
}
