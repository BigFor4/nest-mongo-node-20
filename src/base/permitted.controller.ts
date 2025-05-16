import { Controller, Get, Query } from '@nestjs/common';

@Controller('permitted')
export class PermittedController {
    @Get()
    getPermitted(@Query('user') user: string) {
        // Hardcoded permitted mapping as in Node-RED flow
        const permitted: Record<string, string[]> = {
            'rx024d@att.com': ['all'],
            'joshua.mecca@msbiotics.com': ['all'],
            'sri.v@msbiotics.com': ['all'],
            'rick.mcconney@gmail.com': ['OR_101'],
            'scott.hendrickson@va.gov': ['VA_101'],
            'user1@msb.com': ['VA_101'],
            'user2@msb.com': ['VA_101'],
            'russd@mestizo.cc': ['all'],
        };
        return permitted[user] || [];
    }
}
