import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
const keyConvert = {
    Root: 'Root',
    'Qualifier root': 'Root',
    Context1: 'English',
    Denmark: 'Denmark',
    Finland: 'Finland',
    Germany: 'Germany',
    GL: 'Root',
    Global: 'Root',
    Norway: 'Norway',
    Sweden: 'Sweden',
    da: 'Denmark',
    'en-US': 'English',
    fi: 'Finland',
    de: 'Germany',
    'std.lang.all': 'Root',
    no: 'Norway',
    sv: 'Sweden',
    AllCountries: 'Root',
    DA: 'Denmark',
    FI: 'Finland',
    DE: 'Germany',
    NOR: 'Norway',
    SE: 'Sweden',
    US: 'English',
    UK: 'English',
};
@Injectable()
export class XmlService {
    async parseXml(xmlData: string): Promise<any> {
        xmlData = xmlData
            .replaceAll('AttributeID="asset.', 'AttributeID="att_')
            .replaceAll(/\s+/g, ' ');
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
            textNodeName: 'DamText',
            trimValues: true,
        });
        const parsedData = parser.parse(xmlData);
        const assetsArray = parsedData['STEP-ProductInformation']['Assets']['Asset'];
        const assets = this.transformAssets(assetsArray);

        const classificationArray =
            parsedData['STEP-ProductInformation']['Classifications']['Classification'];
        const classifications = this.transformClassification(classificationArray);

        const productArray = parsedData['STEP-ProductInformation']['Products']['Product'];
        const products = this.transformProduct(productArray);
        return {
            products,
            classifications,
            assets,
        };
    }
    private transformProduct(arrayData: any[], parentId?: string): any[] {
        if (!Array.isArray(arrayData)) {
            arrayData = [arrayData];
        }
        return arrayData.reduce((acc, product) => {
            const _id = product['ID'] || '';
            const name = product['Name'] || '';
            let allTextRow = _id + ' ' + name;
            const item = {
                _id,
                name,
                parentId: product['ParentID'] || parentId || '',
                userTypeID: product['UserTypeID'] || '',
                assetCrossReference: [],
                allTextRow: '',
            };
            const assetCrossReference = [];
            if (!Array.isArray(product['AssetCrossReference'])) {
                product['AssetCrossReference'] = product['AssetCrossReference']
                    ? [product['AssetCrossReference']]
                    : [];
            }
            product['AssetCrossReference'].map((reference) => {
                assetCrossReference.push({
                    assetID: reference['AssetID'] || '',
                    type: reference['QualifierID'] || '',
                });
            });
            item.assetCrossReference = assetCrossReference;
            if (product['Values']) {
                if (!Array.isArray(product['Values']['Value'])) {
                    product['Values']['Value'] = product['Values']['Value']
                        ? [product['Values']['Value']]
                        : [];
                }
                product['Values']['Value'].map((value) => {
                    const textValue = value?.['DamText'] || '';
                    allTextRow = allTextRow + ' ' + textValue;
                    item[value['AttributeID']] = textValue;
                });
            }
            item.allTextRow = allTextRow;
            acc.push(item);
            if (product['Product']) {
                acc = acc.concat(this.transformProduct(product['Product'], product['ID']));
            }
            return acc;
        }, []);
    }

    private transformClassification(arrayData: any[]): any[] {
        return arrayData.map((asset) => {
            let allTextRow = '';
            const _id = asset['ID'] || '';
            allTextRow = allTextRow + ' ' + _id;
            const initParams = {
                _id: asset['ID'] || '',
                name: {},
                parentId: asset['ParentID'] || '',
                userTypeID: asset['UserTypeID'] || '',
                referenced: asset['Referenced'],
                allTextRow: '',
                attributeLink: [],
                metadata: {},
            };
            if (asset?.['Name']) {
                if (!Array.isArray(asset['Name'])) {
                    asset['Name'] = asset['Name'] ? [asset['Name']] : [];
                }
                asset['Name'].map((value) => {
                    const textValue = value?.['DamText'] || '';
                    allTextRow = allTextRow + ' ' + textValue;
                    const key = keyConvert[value['QualifierID']] || 'Root';
                    initParams.name = {
                        ...initParams.name,
                        [key]: textValue,
                    };
                });
            }
            if (asset?.['AttributeLink']) {
                if (!Array.isArray(asset['AttributeLink'])) {
                    asset['AttributeLink'] = asset['AttributeLink'] ? [asset['AttributeLink']] : [];
                }
                initParams.attributeLink = asset['AttributeLink'].map((value) => {
                    const textValue = value['AttributeID'] || '';
                    return textValue;
                });
            }
            if (asset?.['MetaData']) {
                if (!Array.isArray(asset['MetaData']['MultiValue'])) {
                    asset['MetaData']['MultiValue'] = asset['MetaData']['MultiValue']
                        ? [asset['MetaData']['MultiValue']]
                        : [];
                }
                const metadata = {};
                asset['MetaData']['MultiValue'].map((multiValue) => {
                    if (!Array.isArray(multiValue['ValueGroup'])) {
                        multiValue['ValueGroup'] = multiValue['ValueGroup']
                            ? [multiValue['ValueGroup']]
                            : [];
                    }
                    multiValue['ValueGroup'].map((group) => {
                        if (group?.['Value']?.length > 0) {
                            group['Value'].map((value) => {
                                const textValue = value?.['DamText'] || '';
                                allTextRow = allTextRow + ' ' + textValue;
                                if (
                                    metadata[
                                        keyConvert[value['QualifierID'] || value['QualifierID']]
                                    ]
                                ) {
                                    metadata[
                                        keyConvert[value['QualifierID'] || value['QualifierID']]
                                    ].push(textValue);
                                } else {
                                    metadata[
                                        keyConvert[value['QualifierID'] || value['QualifierID']]
                                    ] = [textValue];
                                }
                            });
                        }
                    });
                });
                initParams.metadata = metadata;
            }
            initParams.allTextRow = allTextRow;
            return initParams;
        });
    }

    private transformAssets(arrayData: any[]): any[] {
        return arrayData.map((asset) => {
            let allTextRow = '';
            const _id = asset['ID'] || '';
            const name = asset['Name']?.['DamText'] || '';
            const objectTypeID = asset['UserTypeID'] || '';
            allTextRow = allTextRow + ' ' + _id + ' ' + name + ' ' + objectTypeID;
            const initParams = {
                _id,
                name,
                objectTypeID,
                allTextRow,
                classification: [],
            };
            if (!Array.isArray(asset['ClassificationReference'])) {
                asset['ClassificationReference'] = asset['ClassificationReference']
                    ? [asset['ClassificationReference']]
                    : [];
            }
            const classification = asset['ClassificationReference'].map((value) => {
                const textValue = value['ClassificationID'] || '';
                return textValue;
            });
            initParams.classification = classification || [];
            if (asset?.['Values']?.['Value']) {
                if (!Array.isArray(asset['Values']['Value'])) {
                    asset['Values']['Value'] = asset['Values']['Value']
                        ? [asset['Values']['Value']]
                        : [];
                }
                asset['Values']['Value'].map((value) => {
                    const textValue = value?.['DamText'] || '';
                    allTextRow = allTextRow + ' ' + textValue;
                    initParams[value['AttributeID']] = textValue;
                });
            }
            if (asset?.['Values']?.['ValueGroup']) {
                if (!Array.isArray(asset['Values']['ValueGroup'])) {
                    asset['Values']['ValueGroup'] = asset['Values']['ValueGroup']
                        ? [asset['Values']['ValueGroup']]
                        : [];
                }
                asset['Values']['ValueGroup'].map((group) => {
                    if (group?.['Value']?.length > 0) {
                        if (!initParams[group['AttributeID']]) {
                            initParams[group['AttributeID']] = {};
                        }
                        group['Value'].map((value) => {
                            const textValue = value?.['DamText'] || '';
                            allTextRow = allTextRow + ' ' + textValue;
                            initParams[group['AttributeID']] = {
                                ...initParams[group['AttributeID']],
                                [keyConvert[value['DerivedContextID'] || value['QualifierID']]]:
                                    textValue,
                            };
                        });
                    }
                });
            }
            if (asset?.['Values']?.['MultiValue']) {
                if (!Array.isArray(asset['Values']['MultiValue'])) {
                    asset['Values']['MultiValue'] = asset['Values']['MultiValue']
                        ? [asset['Values']['MultiValue']]
                        : [];
                }
                asset['Values']['MultiValue'].map((group) => {
                    if (group?.['Value']?.length > 0) {
                        initParams[group['AttributeID']] = group['Value'].map((value) => {
                            const textValue = value?.['DamText'] || '';
                            allTextRow = allTextRow + ' ' + textValue;
                            return textValue;
                        });
                    }
                });
            }
            initParams.allTextRow = allTextRow;
            return initParams;
        });
    }
}
