import { Controller, Post, Body } from '@nestjs/common';

@Controller('management')
export class ManagementController {
    @Post()
    handleManagement(@Body() body: any) {
        // TODO: Implement logic to match Node-RED /management POST endpoint
        return { status: 'ok' };
    }
}
