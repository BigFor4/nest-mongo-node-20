import { RegistryService } from '@modules/registry/registry.service';
import { Injectable } from '@nestjs/common';
import { GlobalStateService } from '@configs/globalState.service';
import { TableService } from '@modules/table/table.service';
import { MetaService } from '@modules/meta/meta.service';
@Injectable()
export class ToolService {
    constructor(
        private registryService: RegistryService,
        private tableService: TableService,
        private globalStateService: GlobalStateService,
        private metaService: MetaService
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

    async tagmap(payload: { tag: string; meta: any }) {
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
            await this.metaService.updateMany({}, tagmap);
            return tagmap;
        }
        return null;
    }

    async test(query: any) {
        return this.registryService.findMany(query);
    }

    async delete(query: any) {
        return this.registryService.deletMultiple(query);
    }

    zebra(payload: {
        id: string;
        loc: string;
        newTags?: Array<{ epc: string; count: number; rssi: number }>;
        missingTags?: string[];
        replacedTags?: Array<{ epc: string; count: number; rssi: number }>;
    }) {
        function isEmpty(obj: Record<string, any>) {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    return false;
            }
            return true;
        }

        const getMeta = (id: string) => {
            const tagmap = this.globalStateService.getAll('tagmap');
            return tagmap && tagmap[id] !== undefined ? tagmap[id] : 'unmapped';
        };

        const room = payload.id;
        const loc = payload.loc;
        const now = Math.floor(Date.now() / 1000);

        const current = this.globalStateService.get('currentOperations', room);
        if (!current) {
            return null;
        }

        const startTags = current.tags || {};
        let delta: any = { tags: {} };

        if (payload.newTags) {
            for (const tagObj of payload.newTags) {
                const id = tagObj.epc;
                let tag = startTags[id];
                if (tag === undefined) {
                    tag = { meta: getMeta(id), t: {}, inuse: 0, startTime: 0 };
                    startTags[id] = tag;
                    tag.loc = loc;
                    tag.count = tagObj.count;
                    tag.rssi = tagObj.rssi;
                    const change: any = {
                        meta: tag.meta,
                        loc: tag.loc,
                        count: tag.count,
                        rssi: tag.rssi,
                    };
                    delta.tags[id] = change;
                }
                if (tag.t[loc] === undefined) tag.t[loc] = {};
                tag.t[loc].loc = loc;
                tag.t[loc].count = tagObj.count;
                tag.t[loc].rssi = tagObj.rssi;
            }
            if (!isEmpty(delta.tags)) {
                delta.room = room;
                delta.msgtype = 'update';
                // You can emit websocket or return this delta as needed
                // Example: this.websocketService.emit('update', [delta]);
                // For now, just return the delta
                return [delta];
            }
        }

        if (payload.missingTags) {
            for (const id of payload.missingTags) {
                const tag = startTags[id];
                if (tag && tag.t[loc]) {
                    tag.t[loc].loc = 'U';
                }
            }
        }

        if (payload.replacedTags) {
            for (const tagObj of payload.replacedTags) {
                const id = tagObj.epc;
                const tag = startTags[id];
                if (tag && tag.t[loc]) {
                    tag.t[loc].loc = loc;
                    tag.t[loc].count = tagObj.count;
                    tag.t[loc].rssi = tagObj.rssi;
                }
            }
        }

        delta = { tags: {} };
        for (const tid in startTags) {
            const tag = startTags[tid];
            let max = 0;
            let newLoc = 'U';
            for (const j in tag.t) {
                if (tag.t[j].loc !== 'U') {
                    if (tag.t[j].count > max) {
                        max = tag.t[j].count;
                        newLoc = j;
                    }
                }
            }
            if (tag.loc !== newLoc) {
                tag.loc = newLoc;
                if (newLoc !== 'U') {
                    if (tag.startTime > 0) {
                        tag.inuse = (tag.inuse || 0) + (now - tag.startTime);
                        tag.startTime = 0;
                    }
                } else {
                    if (tag.startTime === undefined) tag.inuse = 0;
                    if (tag.startTime > 0)
                        tag.inuse = (tag.inuse || 0) + (now - tag.startTime);
                    tag.startTime = now;
                }
                delta.tags[tid] = {
                    loc: tag.loc,
                    count: tag.count,
                    rssi: tag.rssi,
                    inuse: tag.inuse,
                };
            }
        }

        if (!isEmpty(delta.tags)) {
            delta.room = room;
            delta.msgtype = 'update';
            return [delta];
        }

        return null;
    }

    async nucCmd(payload: { room: string; cmd: string; uuid: string }) {
        const { room, cmd, uuid } = payload;
        const status: Record<string, string> = {};
        const guiMsg: any = {};
        let dbMsg: any = null;
        let tcpMsg: any = null;

        guiMsg.payload = [{ msgtype: 'nuc', room, cmd, uuid }];

        if (cmd.indexOf('config') >= 0) {
            const config = JSON.parse(cmd.substring(7));
            const query = { uuid: config.uuid };
            const newdoc = {
                name: config.name,
                power: config.power,
                missing: config.missing,
                ip: config.ip,
                cmd: config.cmd,
                uuid: config.uuid,
                ports: config.ports,
                dfUrl: config.dfUrl,
                state: config.state,
                msgtype: config.msgtype,
                mode: config.mode,
                readerIp: config.readerIp,
                table: config.table,
                dwell: config.dwell,
                port: config.port,
                room: config.room,
            };
            await this.tableService.updateOne(query, newdoc);
            dbMsg = {
                payload: [query, newdoc],
            };
        }

        const sessions = this.globalStateService.getAll('sessions');
        const session = sessions ? sessions[uuid] : null;

        if (session) {
            tcpMsg = {
                _session: session.session,
                payload: cmd + '\r\n',
            };
            status[uuid] = 'ok';
        } else {
            tcpMsg = null;
            status[uuid] = 'No Session';
        }

        const httpMsg = { payload: { status } };

        return [tcpMsg, httpMsg, guiMsg, dbMsg];
    }
}
