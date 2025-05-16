import { Module } from '@nestjs/common';
import { EncryptController } from '../encrypt.controller';

@Module({
    controllers: [EncryptController],
})
export class EncryptModule {}
