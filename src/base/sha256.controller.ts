import { Controller, Get, Query } from '@nestjs/common';

@Controller('sha256')
export class Sha256Controller {
    @Get()
    handleSha256(@Query() query: any) {
        // TODO: Implement logic to match Node-RED /sha256 GET endpoint
        return { status: 'ok' };
    }
}
