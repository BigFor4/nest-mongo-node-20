import { Controller, Post, Body } from '@nestjs/common';

@Controller('tagnet')
export class TagnetController {
    @Post()
    handleTagnet(@Body() body: any) {
        // TODO: Implement logic to match Node-RED /tagnet POST endpoint
        return { status: 'ok' };
    }
}
