import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends Document> {
    constructor(private readonly model: Model<T>) {}

    async create(createDto: Partial<T>): Promise<T> {
        const createdItem = new this.model(createDto);
        return createdItem.save();
    }
    async createMany(createDtos: Partial<T>[]): Promise<any[]> {
        const createdItems = await this.model.insertMany(createDtos);
        return createdItems;
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findMany(query: any): Promise<T[]> {
        if (!query) {
            query = {};
        } else if (typeof query === 'string') {
            query = { _id: query };
        }
        return this.model.find(query).exec();
    }

    async findOne(query: any): Promise<T> {
        if (!query) {
            query = {};
        } else if (typeof query === 'string') {
            query = { _id: query };
        }
        return this.model.findOne(query).exec();
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

    async findById(id: string): Promise<T> {
        const item = await this.model.findById(id).exec();
        if (!item) throw new NotFoundException('Item not found');
        return item;
    }

    async updateById(id: string, updateDto: Partial<T>): Promise<T> {
        const updatedItem = await this.model
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!updatedItem) throw new NotFoundException('Item not found');
        return updatedItem;
    }

    async updateMany(filter: any, updateDto: Partial<T>): Promise<number> {
        const result = await this.model.updateMany(filter, updateDto).exec();
        if (result.modifiedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.modifiedCount;
    }

    async updateOne(filter: any, updateDto: Partial<T>): Promise<number> {
        const result = await this.model.updateOne(filter, updateDto).exec();
        if (result.modifiedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.modifiedCount;
    }

    async deletById(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        if (!result) throw new NotFoundException('Item not found');
        return true;
    }

    async deleteMany(filter: any): Promise<number> {
        const result = await this.model.deleteMany(filter).exec();
        if (result.deletedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.deletedCount;
    }

    async deletOne(filter: any): Promise<number> {
        const result = await this.model.deleteOne(filter).exec();
        if (result.deletedCount === 0)
            throw new NotFoundException('No items matched the query');
        return result.deletedCount;
    }

    async count(filter: any = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }

    async aggregate(pipeline: any[]): Promise<any[]> {
        return this.model.aggregate(pipeline).exec();
    }

    async distinct(field: string, filter: any = {}): Promise<any[]> {
        return this.model.distinct(field, filter).exec();
    }
}
