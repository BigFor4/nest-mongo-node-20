import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class XmlService {
    async parseXml(xmlData: string): Promise<any> {
        xmlData = xmlData.replaceAll('AttributeID="asset.', 'AttributeID="att_');
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
            textNodeName: 'DamText',
        });
        const parsedData = parser.parse(xmlData);
        const assetsArray = parsedData['STEP-ProductInformation']['Assets']['Asset'];
        return {
            success: true,
            data: this.transformAssets(assetsArray),
        };
    }

    private transformAssets(assetArray: any[]): any[] {
        return assetArray.map((asset) => {
            const initParams = {
                _id: asset['ID'] || '',
                name: asset['Name']?.text || '',
                objectTypeID: asset['UserTypeID'] || '',
            };
            if (asset?.['Values']?.['Value']?.length > 0) {
                asset['Values']['Value'].map((value) => {
                    initParams[value['AttributeID']] = value['DamText'] || '';
                });
            }
            if (asset?.['Values']?.['ValueGroup']?.length > 0) {
                asset['Values']['ValueGroup'].map((group) => {
                    if (group?.['Value']?.length > 0) {
                        initParams[group['AttributeID']] = group['Value'].map((value) => {
                            return {
                                [value['DerivedContextID']]: value['DamText'] || '',
                            };
                        });
                    }
                });
            }
            return initParams;
        });
    }
}
