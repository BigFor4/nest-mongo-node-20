import { Controller, Get, Query } from '@nestjs/common';

@Controller('rsadecrypt')
export class RsaDecryptController {
    @Get()
    handleRsaDecrypt(@Query() query: any) {
        // TODO: Implement logic to match Node-RED /rsadecrypt GET endpoint
        return { status: 'ok' };
    }
}
