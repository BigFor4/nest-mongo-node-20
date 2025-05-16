import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Body,
} from '@nestjs/common';
import { ToolService } from './tool.service';
import { ApiTags } from '@nestjs/swagger';
import * as Joi from 'joi';

@ApiTags('Tool')
@Controller('')
export class ToolController {
    constructor(private readonly toolService: ToolService) {}

    @Get('permitted')
    getTool(@Query('user') user: string) {
        const schema = Joi.string().email().required();
        const { error } = schema.validate(user);
        if (error) throw error;
        return this.toolService.getTool(user);
    }

    @Get('current')
    getCurrentRoom(@Query('id') roomId: string) {
        const schema = Joi.string().required();
        const { error } = schema.validate(roomId);
        if (error) throw error;
        return this.toolService.getCurrentRoom(roomId);
    }

    @Get('history')
    getHistory(
        @Query('id') id: string,
        @Query('start') start: number,
        @Query('end') end: number
    ) {
        const schema = Joi.object({
            id: Joi.string().required(),
            start: Joi.number().required(),
            end: Joi.number().required(),
        });
        const { error } = schema.validate({ id, start, end });
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }
        return this.toolService.getHistory(id, start, end);
    }

    @Post('start')
    start(@Body() payload) {
        const schema = Joi.object({
            id: Joi.string().required(),
            state: Joi.string().valid('start', 'watch', 'cancel').required(),
            surgeon: Joi.string().optional(),
            operation: Joi.string().optional(),
        });
        const { error } = schema.validate(payload);
        if (error) throw new BadRequestException(error.message);
        return this.toolService.start(payload);
    }

    @Post('stop')
    stop(@Body() payload) {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(payload);
        if (error) throw new BadRequestException(error.message);
        return this.toolService.stop(payload);
    }

    @Post('stopAll')
    stopAll() {
        return this.toolService.stopAll();
    }

    @Post('tagmap')
    async tagmap(@Body() payload) {
        const schema = Joi.object({
            tag: Joi.string().required(),
            meta: Joi.any().required(),
        });
        const { error } = schema.validate(payload);
        if (error) throw new BadRequestException(error.message);
        return this.toolService.tagmap(payload);
    }

    @Post('test')
    async test(@Body() query: any) {
        return this.toolService.test(query);
    }

    @Delete('delete')
    async delete(@Body() query: any) {
        return this.toolService.delete(query);
    }

    @Post('zebra')
    zebra(@Body() payload) {
        const schema = Joi.object({
            id: Joi.string().required(),
            loc: Joi.string().required(),
            newTags: Joi.array()
                .items(
                    Joi.object({
                        epc: Joi.string().required(),
                        count: Joi.number().required(),
                        rssi: Joi.number().required(),
                    })
                )
                .optional(),
            missingTags: Joi.array().items(Joi.string()).optional(),
            replacedTags: Joi.array()
                .items(
                    Joi.object({
                        epc: Joi.string().required(),
                        count: Joi.number().required(),
                        rssi: Joi.number().required(),
                    })
                )
                .optional(),
        });
        const { error } = schema.validate(payload);
        if (error) throw new BadRequestException(error.message);
        return this.toolService.zebra(payload);
    }

    @Post('nucCmd')
    async nucCmd(@Body() payload) {
        const schema = Joi.object({
            room: Joi.string().required(),
            cmd: Joi.string().required(),
            uuid: Joi.string().required(),
        });
        const { error } = schema.validate(payload);
        if (error) throw new BadRequestException(error.message);
        return this.toolService.nucCmd(payload);
    }

    @Delete('delTable/:uuid')
    async delTable(@Param('uuid') uuid: string) {
        const schema = Joi.string().required();
        const { error } = schema.validate(uuid);
        if (error) throw error;
        return this.toolService.delTable(uuid);
    }
}
