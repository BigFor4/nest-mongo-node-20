import { Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';
import { AuthGuardConfig } from '@configs/guard.config';
import { ApiBearerAuth } from '@nestjs/swagger';

export class BaseController<T extends Document> {
    constructor(private readonly baseService: BaseService<T>) {}

    @Post()
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    create(@Body() createDto: Partial<T>) {
        return this.baseService.create(createDto);
    }

    @Get()
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findAll() {
        return this.baseService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findOne(@Param('id') id: string) {
        return this.baseService.findOne(id);
    }

    @Patch(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    update(@Param('id') id: string, @Body() updateDto: Partial<T>) {
        return this.baseService.update(id, updateDto);
    }

    @Delete(':id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    remove(@Param('id') id: string) {
        return this.baseService.remove(id);
    }
}
