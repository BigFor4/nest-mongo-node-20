import { Module } from '@nestjs/common';
import { Sha256Controller } from './sha256.controller';

@Module({
    controllers: [Sha256Controller],
})
export class Sha256Module {}
