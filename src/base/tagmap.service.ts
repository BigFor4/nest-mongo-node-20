import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface MetaDocument {
    tag: string;
    meta: any;
}

@Injectable()
export class TagmapService {
    constructor(
        @InjectModel('Meta') private readonly metaModel: Model<MetaDocument>
    ) {}

    async updateTagmap(tag: string, meta: any): Promise<any> {
        // Update or insert the meta document for the tag
        await this.metaModel.replaceOne(
            { tag },
            { tag, meta },
            { upsert: true }
        );
        return { tag, meta };
    }
}
