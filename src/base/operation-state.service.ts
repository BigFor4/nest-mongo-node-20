import { Injectable } from '@nestjs/common';

interface Operation {
    room: string;
    tags: Record<string, any>;
    startTime?: number;
    elapsed?: number;
    surgeon?: string;
    operation?: string;
    msgtype?: string;
}

@Injectable()
export class OperationStateService {
    private currentOperations: Record<string, Operation> = {};

    setOperation(room: string, op: Operation) {
        this.currentOperations[room] = op;
    }

    getOperation(room: string): Operation | undefined {
        return this.currentOperations[room];
    }

    deleteOperation(room: string) {
        delete this.currentOperations[room];
    }

    getAll() {
        return this.currentOperations;
    }
}
