import { Module } from '@nestjs/common';
import { RsaDecryptController } from '../rsadecrypt.controller';

@Module({
    controllers: [RsaDecryptController],
})
export class RsadecryptModule {}
