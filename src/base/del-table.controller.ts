import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DelTableService } from './del-table.service';

@Controller()
export class DelTableController {
    constructor(private readonly delTableService: DelTableService) {}

    // GET /delTable?uuid=...
    @Get('delTable')
    async delTable(@Query('uuid') uuid: string, @Res() res: Response) {
        if (!uuid) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ error: 'uuid is required' });
        }
        const result = await this.delTableService.deleteTableByUuid(uuid);
        return res.status(HttpStatus.OK).json(result);
    }
}
