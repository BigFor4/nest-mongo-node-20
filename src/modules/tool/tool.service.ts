import { RegistryService } from '@modules/registry/registry.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ToolService {
    constructor(private registryService: RegistryService) {}
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
        return [];
    }

    getHistory(id: string, start: number, end: number) {
        const startTime = new Date(Number(start));
        const endTime = new Date(Number(end));
        return this.registryService
            .findByQuery({
                id: id.replace(/:/g, ''),
                startTime: { $gt: startTime, $lt: endTime },
            })
            .exec();
    }
}
