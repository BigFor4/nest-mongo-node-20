import { Module } from '@nestjs/common';
import { JwtController } from './jwt.controller';

@Module({
    controllers: [JwtController],
})
export class JwtModule {}
