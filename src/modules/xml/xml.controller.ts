import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XmlService } from './xml.service';

@Controller('xml')
export class XmlController {
    constructor(private readonly xmlService: XmlService) {}

    @Post('parseXml')
    @UseInterceptors(FileInterceptor('file'))
    async parseXml(@UploadedFile() file: Express.Multer.File) {
        try {
            const xmlContent = file.buffer.toString('utf-8');
            const jsonData = await this.xmlService.parseXml(xmlContent);
            return { success: true, data: jsonData };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
