import { Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';

export class BaseController<T extends Document> {
    constructor(private readonly baseService: BaseService<T>) {}

    @Post()
    create(@Body() createDto: Partial<T>) {
        return this.baseService.create(createDto);
    }

    @Get()
    findAll() {
        return this.baseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.baseService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: Partial<T>) {
        return this.baseService.update(id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.baseService.remove(id);
    }
}
