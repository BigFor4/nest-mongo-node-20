import { RegistryService } from '@modules/registry/registry.service';
import { Injectable } from '@nestjs/common';
import { GlobalStateService } from '@configs/globalState.service';
@Injectable()
export class ToolService {
    constructor(
        private registryService: RegistryService,
        private globalStateService: GlobalStateService
    ) {}
    getTool(user: string) {
        const permitted: Record<string, string[]> = {
            'rx024d@att.com': ['all'],
            'joshua.mecca@msbiotics.com': ['all'],
            'sri.v@msbiotics.com': ['all'],
            'rick.mcconney@gmail.com': ['OR_101'],
            'scott.hendrickson@va.gov': ['VA_101'],
            'user1@msb.com': ['VA_101'],
            'user2@msb.com': ['VA_101'],
            'russd@mestizo.cc': ['all'],
        };
        return permitted[user] || [];
    }

    getCurrentRoom(roomId: string) {
        const current = this.globalStateService.get(
            'currentOperations',
            roomId
        );
        return current;
    }

    getHistory(id: string, start: number, end: number) {
        const startTime = new Date(Number(start));
        const endTime = new Date(Number(end));
        return this.registryService.findMany({
            id: id.replace(/:/g, ''),
            startTime: { $gt: startTime, $lt: endTime },
        });
    }

    start(payload: {
        id: string;
        state: string;
        surgeon?: string;
        operation?: string;
    }) {
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
            this.globalStateService.set('currentOperations', room, current);
        } else if (state === 'watch') {
            current = this.globalStateService.get('currentOperations', room);
        } else if (state === 'cancel') {
            current = this.globalStateService.get('currentOperations', room);
            this.globalStateService.delete('currentOperations', room);
        }
        if (current === undefined) {
            current = { room, tags: {} };
        }
        current.msgtype = state;
        return [current];
    }

    stop(payload: { id: string }) {
        const room = payload.id;
        let current = this.globalStateService.get('currentOperations', room);
        if (current) {
            this.globalStateService.delete('currentOperations', room);
            const now = new Date();
            const registryPayload = {
                id: room.replace(/:/g, ''),
                startTime: new Date(current.startTime),
                endTime: now,
                lastTime: now,
                state: 'stopped',
                surgeon: current.surgeon,
                operation: current.operation,
            };
            this.registryService.create(registryPayload);
        } else {
            current = { room, tags: {} };
        }
        current.msgtype = 'stopped';
        return [current];
    }

    stopAll() {
        const currentOperations =
            this.globalStateService.getAll('currentOperations');
        for (const i in currentOperations) {
            const current = currentOperations[i];
            current.state = 'stopped';
            this.globalStateService.set('currentOperations', i, current);
        }
        return null;
    }

    tagmap(payload: { tag: string; meta: any }) {
        const { tag, meta } = payload;
        if (tag && meta) {
            const currentOperations =
                this.globalStateService.getAll('currentOperations');
            if (currentOperations) {
                Object.values(currentOperations).forEach((current: any) => {
                    const item = current.tags && current.tags[tag];
                    if (item) {
                        item.meta = meta;
                    }
                });
            }
            this.globalStateService.set('tagmap', tag, meta);
            const tagmap = this.globalStateService.getAll('tagmap');
            const dbMsg = [{}, tagmap, { upsert: true }];
            return dbMsg;
        }
        return null;
    }
}
