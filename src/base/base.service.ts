import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends Document> {
    constructor(private readonly model: Model<T>) {}

    async create(createDto: Partial<T>): Promise<T> {
        const createdItem = new this.model(createDto);
        return createdItem.save();
    }

    async createByQuery(query: Partial<T>): Promise<T> {
        const createdItem = new this.model(query);
        return createdItem.save();
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findPaginated(
        query: any,
        page: number,
        limit: number
    ): Promise<{ data: T[]; total: number }> {
        if (!query) {
            query = {};
        } else if (typeof query === 'string') {
            query = { _id: query };
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find(query).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec(),
        ]);
        return { data, total };
    }

    async findOne(id: string): Promise<T> {
        const item = await this.model.findById(id).exec();
        if (!item) throw new NotFoundException('Item not found');
        return item;
    }

    async update(id: string, updateDto: Partial<T>): Promise<T> {
        const updatedItem = await this.model
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!updatedItem) throw new NotFoundException('Item not found');
        return updatedItem;
    }

    async updateByQuery(filter: any, updateDto: Partial<T>): Promise<number> {
        const result = await this.model.updateMany(filter, updateDto).exec();
        if (result.modifiedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.modifiedCount;
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Item not found');
        return true;
    }

    async removeByQuery(filter: any): Promise<number> {
        const result = await this.model.deleteMany(filter).exec();
        if (result.deletedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.deletedCount;
    }
}
