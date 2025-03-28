import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class XmlService {
    async parseXml(xmlData: string): Promise<any> {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
            textNodeName: 'text',
        });
        return parser.parse(xmlData);
    }
}
