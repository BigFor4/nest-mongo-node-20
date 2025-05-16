import { Module } from '@nestjs/common';
import { StartController } from './start.controller';
import { OperationStateService } from './operation-state.service';
import { UpdateGateway } from './update.gateway';

@Module({
    controllers: [StartController],
    providers: [OperationStateService, UpdateGateway],
    exports: [OperationStateService, UpdateGateway],
})
export class StartModule {}
