import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    // GET /history?id=...&start=...&end=...
    @Get('history')
    async getHistory(
        @Query('id') id: string,
        @Query('start') start: number,
        @Query('end') end: number,
        @Res() res: Response
    ) {
        if (!id || !start || !end) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ error: 'id, start, and end are required' });
        }
        const history = await this.historyService.getHistory(id, start, end);
        return res.status(HttpStatus.OK).json({ history });
    }
}
