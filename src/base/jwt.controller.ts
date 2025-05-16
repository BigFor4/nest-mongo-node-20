import { Controller, Get, Query } from '@nestjs/common';

@Controller('jwt')
export class JwtController {
    @Get()
    handleJwt(@Query() query: any) {
        // TODO: Implement logic to match Node-RED /jwt GET endpoint
        return { status: 'ok' };
    }
}
