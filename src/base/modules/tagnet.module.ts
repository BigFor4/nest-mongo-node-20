import { Module } from '@nestjs/common';
import { TagnetController } from '../tagnet.controller';

@Module({
    controllers: [TagnetController],
})
export class TagnetModule {}
