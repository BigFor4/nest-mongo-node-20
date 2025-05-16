import { Controller, Get, Query } from '@nestjs/common';

@Controller('decrypt')
export class DecryptController {
    @Get()
    handleDecrypt(@Query() query: any) {
        // TODO: Implement logic to match Node-RED /decrypt GET endpoint
        return { status: 'ok' };
    }
}
