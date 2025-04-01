import { Asset } from '@modules/asset/schemas/asset.schema';
import { Classification } from '@modules/classification/schemas/classification.schema';
import { Product } from '@modules/product/schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { XMLParser } from 'fast-xml-parser';
import { Model } from 'mongoose';
const keyConvert = {
    Root: 'English',
    'Qualifier root': 'English',
    Context1: 'English',
    Denmark: 'Denmark',
    Finland: 'Finland',
    Germany: 'Germany',
    GL: 'English',
    Global: 'English',
    Norway: 'Norway',
    Sweden: 'Sweden',
    da: 'Denmark',
    'en-US': 'English',
    fi: 'Finland',
    de: 'Germany',
    'std.lang.all': 'English',
    no: 'Norway',
    sv: 'Sweden',
    AllCountries: 'English',
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
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Classification.name) private classificationModel: Model<Classification>,
        @InjectModel(Asset.name) private assetModel: Model<Asset>,
    ) {}
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
        const classificationArray =
            parsedData['STEP-ProductInformation']['Classifications']['Classification'];
        const classifications = this.transformClassification(classificationArray);

        const assetsArray = parsedData['STEP-ProductInformation']['Assets']['Asset'];
        const assets = this.transformAssets(assetsArray, classifications);

        const productArray = parsedData['STEP-ProductInformation']['Products']['Product'];
        const products = this.transformProduct(productArray);

        await this.saveClassifications(classifications);
        await this.saveAssets(assets);
        await this.saveProducts(products);

        return {
            products,
            classifications,
            assets,
        };
    }
    async saveClassifications(classifications: Classification[]) {
        await this.classificationModel.deleteMany();
        const operations = classifications.map((classification) => ({
            updateOne: {
                filter: { _id: classification._id },
                update: { $set: classification },
                upsert: true,
            },
        }));
        await this.classificationModel.bulkWrite(operations);
    }

    async saveAssets(assets: Asset[]) {
        await this.assetModel.deleteMany();
        const operations = assets.map((asset) => ({
            updateOne: {
                filter: { _id: asset._id },
                update: { $set: asset },
                upsert: true,
            },
        }));
        await this.assetModel.bulkWrite(operations);
    }

    async saveProducts(products: Product[]) {
        await this.productModel.deleteMany();
        const operations = products.map((product) => ({
            updateOne: {
                filter: { _id: product._id },
                update: { $set: product },
                upsert: true,
            },
        }));
        await this.productModel.bulkWrite(operations);
    }

    private transformProduct(arrayData: any[], parentId?: string): any[] {
        if (!Array.isArray(arrayData)) {
            arrayData = [arrayData];
        }
        return arrayData.reduce((acc, product) => {
            const _id = product['ID'] || '';
            const name = product['Name']?.['DamText'] || '';
            const initTextKey = _id + ' ' + name;
            let allTextRow = initTextKey;
            const item = {
                _id,
                name,
                parentId: product['ParentID'] || parentId || '',
                userTypeID: product['UserTypeID'] || '',
                assetCrossReference: [],
                allTextRow: '',
                allTextRowLanguage: {
                    English: initTextKey,
                },
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
            item.allTextRowLanguage.English = allTextRow;
            acc.push(item);
            if (product['Product']) {
                acc = acc.concat(this.transformProduct(product['Product'], product['ID']));
            }
            return acc;
        }, []);
    }

    private transformClassification(arrayData: any[]): any[] {
        return arrayData.map((asset) => {
            const _id = asset['ID'] || '';
            const initTextKey = _id;
            let allTextRow = initTextKey;
            const allTextRowLanguage = {
                English: allTextRow,
            };
            const initParams = {
                _id,
                name: {},
                parentId: asset['ParentID'] || '',
                userTypeID: asset['UserTypeID'] || '',
                referenced: asset['Referenced'],
                allTextRow: '',
                attributeLink: [],
                metadata: {},
                allTextRowLanguage: {
                    English: '',
                },
            };
            if (asset?.['Name']) {
                if (!Array.isArray(asset['Name'])) {
                    asset['Name'] = asset['Name'] ? [asset['Name']] : [];
                }
                asset['Name'].map((value) => {
                    const textValue = value?.['DamText'] || '';
                    allTextRow = allTextRow + ' ' + textValue;
                    const key = keyConvert[value['QualifierID']] || 'English';
                    allTextRowLanguage[key] =
                        (allTextRowLanguage[key] || initTextKey) + ' ' + textValue;
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
                                const key =
                                    keyConvert[value['QualifierID'] || value['QualifierID']];
                                allTextRowLanguage[key] =
                                    (allTextRowLanguage[key] || initTextKey) + ' ' + textValue;
                                if (metadata[key]) {
                                    metadata[key].push(textValue);
                                } else {
                                    metadata[key] = [textValue];
                                }
                            });
                        }
                    });
                });
                initParams.metadata = metadata;
            }
            initParams.allTextRow = allTextRow;
            initParams.allTextRowLanguage = allTextRowLanguage;
            return initParams;
        });
    }

    private transformAssets(assetsArray: any[], arrayClassifications: any[]): any[] {
        return assetsArray.map((asset) => {
            const _id = asset['ID'] || '';
            const name = asset['Name']?.['DamText'] || '';
            const objectTypeID = asset['UserTypeID'] || '';
            let initTextKey = _id + ' ' + name + ' ' + objectTypeID;
            let allTextRow = initTextKey;
            const allTextRowLanguage = {
                English: allTextRow,
            };
            const initParams = {
                _id,
                name,
                objectTypeID,
                allTextRow,
                classifications: [],
                classificationFolders: [],
                allTextRowLanguage: {
                    English: '',
                },
            };
            if (!Array.isArray(asset['ClassificationReference'])) {
                asset['ClassificationReference'] = asset['ClassificationReference']
                    ? [asset['ClassificationReference']]
                    : [];
            }
            const classifications = [];
            const classificationFolders = [];
            asset['ClassificationReference'].map((value) => {
                const textValue = value['ClassificationID'] || '';
                const classification = arrayClassifications.find((x) => x._id === textValue);
                if (classification) {
                    if (classification.userTypeID === 'AssetFolder') {
                        classificationFolders.push(textValue);
                    } else {
                        classifications.push(textValue);
                    }
                } else {
                    classifications.push(textValue);
                }
                return textValue;
            });
            initParams.classifications = classifications || [];
            initParams.classificationFolders = classificationFolders || [];
            if (asset?.['Values']?.['Value']) {
                if (!Array.isArray(asset['Values']['Value'])) {
                    asset['Values']['Value'] = asset['Values']['Value']
                        ? [asset['Values']['Value']]
                        : [];
                }
                asset['Values']['Value'].map((value) => {
                    const textValue = value?.['DamText'] || '';
                    allTextRow = allTextRow + ' ' + textValue;
                    initTextKey = initTextKey + ' ' + textValue;
                    allTextRowLanguage['English'] = allTextRowLanguage['English'] + ' ' + textValue;
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
                            const key =
                                keyConvert[value['DerivedContextID'] || value['QualifierID']];
                            allTextRowLanguage[key] =
                                (allTextRowLanguage[key] || initTextKey) + ' ' + textValue;
                            initParams[group['AttributeID']] = {
                                ...initParams[group['AttributeID']],
                                [key]: textValue,
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
                            allTextRowLanguage['English'] =
                                allTextRowLanguage['English'] + ' ' + textValue;
                            return textValue;
                        });
                    }
                });
            }
            initParams.allTextRow = allTextRow;
            initParams.allTextRowLanguage = allTextRowLanguage;
            return initParams;
        });
    }
}
