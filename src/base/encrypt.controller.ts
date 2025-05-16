import { Controller, Post, Body } from '@nestjs/common';

@Controller('encrypt')
export class EncryptController {
    @Post()
    handleEncrypt(@Body() body: any) {
        // TODO: Implement logic to match Node-RED /encrypt POST endpoint
        return { status: 'ok' };
    }
}
