import { Controller, Post, Body } from '@nestjs/common';
import { OperationStateService } from './operation-state.service';
import { UpdateGateway } from './update.gateway';

interface StartPayload {
    id: string;
    state: 'start' | 'watch' | 'cancel';
    surgeon?: string;
    operation?: string;
    elapsed?: number;
}

@Controller('start')
export class StartController {
    constructor(
        private readonly operationState: OperationStateService,
        private readonly updateGateway: UpdateGateway
    ) {}

    @Post()
    async start(@Body() payload: StartPayload): Promise<{ payload: any[] }> {
        const { id: room, state, surgeon, operation } = payload;
        let current: any;
        if (state === 'start') {
            current = {
                room,
                tags: {},
                startTime: Date.now(),
                elapsed: 0,
                surgeon,
                operation,
            };
            this.operationState.setOperation(room, current);
        } else if (state === 'watch') {
            current = this.operationState.getOperation(room);
        } else if (state === 'cancel') {
            current = this.operationState.getOperation(room);
            this.operationState.deleteOperation(room);
        }
        if (!current) current = { room, tags: {} };
        current.msgtype = state;
        // Set elapsed, surgeon, operation for parity with Node-RED/zebra if present in payload
        if (typeof payload.elapsed === 'number') {
            current.elapsed = payload.elapsed;
        }
        if (typeof payload.surgeon === 'string') {
            current.surgeon = payload.surgeon;
        }
        if (typeof payload.operation === 'string') {
            current.operation = payload.operation;
        }
        // Emit update event to websocket clients
        this.updateGateway.emitUpdate({ payload: [current] });
        return { payload: [current] };
    }
}
