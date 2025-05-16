import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TagmapService } from './tagmap.service';

@Controller()
export class TagmapController {
    constructor(private readonly tagmapService: TagmapService) {}

    // POST /tagmap
    @Post('tagmap')
    async updateTagmap(
        @Body() body: { tag: string; meta: any },
        @Res() res: Response
    ) {
        if (!body.tag || !body.meta) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ error: 'tag and meta are required' });
        }
        const result = await this.tagmapService.updateTagmap(
            body.tag,
            body.meta
        );
        return res.status(HttpStatus.OK).json(result);
    }
}
