import { Module } from '@nestjs/common';
import { ZebraController } from './zebra.controller';
import { UpdateGateway } from './update.gateway';
import { OperationStateService } from './operation-state.service';

@Module({
    controllers: [ZebraController],
    providers: [OperationStateService, UpdateGateway],
    exports: [OperationStateService, UpdateGateway],
})
export class ZebraModule {}
