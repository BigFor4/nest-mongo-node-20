import {
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';
import { AuthGuardConfig } from '@configs/guard.config';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export class BaseController<T extends Document> {
    constructor(private readonly baseService: BaseService<T>) {}

    @Post()
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    create(@Body() createDto: Partial<T>) {
        return this.baseService.create(createDto);
    }

    @Post('create-many')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    createMany(@Body() createDtos: Partial<T>[]) {
        return this.baseService.createMany(createDtos);
    }

    @Get()
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findAll() {
        return this.baseService.findAll();
    }

    @Post('find-many')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findMany(@Body() query: any) {
        return this.baseService.findMany(query);
    }

    @Post('find-one')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findOne(@Body() query: any) {
        return this.baseService.findOne(query);
    }

    @Get('find-by-id/:id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    findById(@Param('id') id: string) {
        return this.baseService.findById(id);
    }

    @Post('paginate')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                query: { type: 'object' },
                page: { type: 'number', default: 1 },
                limit: { type: 'number', default: 10 },
            },
            required: ['page', 'limit'],
        },
    })
    findPaginated(@Body() body: { query?: any; page: number; limit: number }) {
        const { query, page, limit } = body;
        return this.baseService.findPaginated(query || {}, page, limit);
    }

    @Patch('update-by-id/:id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    updateById(@Param('id') id: string, @Body() updateDto: Partial<T>) {
        return this.baseService.updateById(id, updateDto);
    }

    @Patch('update-many')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    updateMany(@Body() body: { filter: any; updateDto: Partial<T> }) {
        return this.baseService.updateMany(body.filter, body.updateDto);
    }

    @Patch('update-one')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    updateOne(@Body() body: { filter: any; updateDto: Partial<T> }) {
        return this.baseService.updateOne(body.filter, body.updateDto);
    }

    @Delete('delete-by-id/:id')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    deleteById(@Param('id') id: string) {
        return this.baseService.deletById(id);
    }

    @Delete('delete-many')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    deleteMany(@Body() filter: any) {
        return this.baseService.deleteMany(filter);
    }

    @Delete('delete-one')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    deleteOne(@Body() filter: any) {
        return this.baseService.deletOne(filter);
    }

    @Post('count')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuardConfig)
    count(@Body() filter: any) {
        return this.baseService.count(filter);
    }
}
