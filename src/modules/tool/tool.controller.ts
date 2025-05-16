import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ApiTags } from '@nestjs/swagger';
import * as Joi from 'joi';

@ApiTags('Tool')
@Controller('')
export class ToolController {
    constructor(private readonly toolService: ToolService) {}
    @Get('permitted')
    getTool(@Query('user') user: string) {
        const permitted = this.toolService.getTool(user);
        return permitted;
    }

    @Get('current')
    getCurrentRoom(@Query('id') roomId: string) {
        const current = this.toolService.getCurrentRoom(roomId);
        return current;
    }

    @Get('history')
    async getHistory(
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
        const history = await this.toolService.getHistory(id, start, end);
        return history;
    }
}
