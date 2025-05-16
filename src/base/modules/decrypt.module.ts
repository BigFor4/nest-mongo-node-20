import { Module } from '@nestjs/common';
import { DecryptController } from '../decrypt.controller';

@Module({
    controllers: [DecryptController],
})
export class DecryptModule {}
