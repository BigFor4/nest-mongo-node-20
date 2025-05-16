import { Module } from '@nestjs/common';
import { PermittedController } from './permitted.controller';

@Module({
    controllers: [PermittedController],
})
export class PermittedModule {}
