import { Controller, Post, Body } from '@nestjs/common';

@Controller('bridge')
export class BridgeController {
    @Post()
    handleBridge(@Body() body: any) {
        // TODO: Implement logic to match Node-RED /bridge POST endpoint
        return { status: 'ok' };
    }
}
