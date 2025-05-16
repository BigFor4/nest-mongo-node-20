import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalStateService {
    private currentOperations: any = {};
    private tagmap: any = {};
    private sessions: any = {};

    get(key: string, room: string) {
        if (!this[key]) this[key] = {};
        if (Array.isArray(this[key])) {
            const idx = Number(room);
            return this[key][idx];
        } else {
            return this[key][room];
        }
    }

    set(key: string, room: string, value: any) {
        if (!this[key]) this[key] = {};
        if (Array.isArray(this[key])) {
            const idx = Number(room);
            this[key][idx] = value;
        } else {
            this[key][room] = value;
        }
    }

    update(key: string, room: string, value: Partial<any>) {
        if (!this[key]) this[key] = {};
        if (Array.isArray(this[key])) {
            const idx = Number(room);
            if (this[key][idx]) {
                this[key][idx] = {
                    ...this[key][idx],
                    ...value,
                };
            }
        } else {
            if (this[key][room]) {
                this[key][room] = {
                    ...this[key][room],
                    ...value,
                };
            }
        }
    }

    delete(key: string, room: string) {
        if (!this[key]) this[key] = {};
        if (Array.isArray(this[key])) {
            const idx = Number(room);
            this[key].splice(idx, 1);
        } else {
            delete this[key][room];
        }
    }

    getAll(key: string) {
        if (!this[key]) this[key] = {};
        if (Array.isArray(this[key])) {
            return [...this[key]];
        } else {
            return { ...this[key] };
        }
    }
}
