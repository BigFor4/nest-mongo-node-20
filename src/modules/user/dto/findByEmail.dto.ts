import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FindByEmailDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email!: string;
}
