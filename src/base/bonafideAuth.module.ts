import { Module } from '@nestjs/common';
import { BonafideAuthController } from './bonafideAuth.controller';

@Module({
    controllers: [BonafideAuthController],
})
export class BonafideAuthModule {}
