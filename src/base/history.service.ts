import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Registry,
    RegistryDocument,
} from '../modules/registry/schemas/registry.schema';

@Injectable()
export class HistoryService {
    constructor(
        @InjectModel(Registry.name)
        private readonly registryModel: Model<RegistryDocument>
    ) {}

    async getHistory(
        id: string,
        start: number,
        end: number
    ): Promise<Registry[]> {
        const startTime = new Date(Number(start));
        const endTime = new Date(Number(end));
        return this.registryModel
            .find({
                id: id.replace(/:/g, ''),
                startTime: { $gt: startTime, $lt: endTime },
            })
            .exec();
    }
}
