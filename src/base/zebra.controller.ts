import { Controller, Post, Body, Inject } from '@nestjs/common';
import { Response } from 'express';
import { OperationStateService } from './operation-state.service';
import { UpdateGateway } from './update.gateway';

@Controller('zebra')
export class ZebraController {
    constructor(
        private readonly operationState: OperationStateService,
        private readonly updateGateway: UpdateGateway
    ) {}

    @Post()
    async zebraUpdate(@Body() body: any): Promise<{ status: string }> {
        if (body && body.id) {
            const room = body.id;
            // --- Node-RED logic: update tags and state ---
            const op = this.operationState.getOperation(room) || {
                room,
                tags: {},
            };
            // If newTags are present, update tags
            if (Array.isArray(body.newTags)) {
                for (const tagObj of body.newTags) {
                    const id = tagObj.epc;
                    if (!op.tags[id]) {
                        op.tags[id] = { meta: undefined, t: {} };
                    }
                    // Update tag location, count, rssi
                    op.tags[id].loc = body.loc;
                    op.tags[id].count = tagObj.count;
                    op.tags[id].rssi = tagObj.rssi;
                    if (!op.tags[id].t[body.loc]) op.tags[id].t[body.loc] = {};
                    op.tags[id].t[body.loc].loc = body.loc;
                    op.tags[id].t[body.loc].count = tagObj.count;
                    op.tags[id].t[body.loc].rssi = tagObj.rssi;
                }
            }
            // If missingTags are present, mark as missing
            if (Array.isArray(body.missingTags)) {
                for (const id of body.missingTags) {
                    if (op.tags[id] && op.tags[id].t[body.loc]) {
                        op.tags[id].t[body.loc].loc = 'U';
                    }
                }
            }
            // If replacedTags are present, update replaced tags
            if (Array.isArray(body.replacedTags)) {
                for (const tagObj of body.replacedTags) {
                    const id = tagObj.epc;
                    if (op.tags[id] && op.tags[id].t[body.loc]) {
                        op.tags[id].t[body.loc].loc = body.loc;
                        op.tags[id].t[body.loc].count = tagObj.count;
                        op.tags[id].t[body.loc].rssi = tagObj.rssi;
                    }
                }
            }
            // Set msgtype for websocket consumers (optional, for parity)
            (op as any).msgtype = 'update';
            // Set op.room for parity (in case it was missing)
            op.room = room;
            // Set op.startTime if not present (for parity with /start)
            if (!(op as any).startTime) {
                (op as any).startTime = Date.now();
            }
            // Set op.elapsed, op.surgeon, op.operation for parity with /start (if present in body)
            if (typeof body.elapsed === 'number') {
                (op as any).elapsed = body.elapsed;
            }
            if (typeof body.surgeon === 'string') {
                (op as any).surgeon = body.surgeon;
            }
            if (typeof body.operation === 'string') {
                (op as any).operation = body.operation;
            }
            this.operationState.setOperation(room, op);
            this.updateGateway.emitUpdate({ payload: [op] });
        }
        return { status: 'ok' };
    }
}
