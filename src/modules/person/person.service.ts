import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from './schemas/person.schema';
import { BaseService } from '@base/base.service';

@Injectable()
export class PersonService extends BaseService<PersonDocument> {
    constructor(
        @InjectModel(Person.name)
        private personModel: Model<PersonDocument>
    ) {
        super(personModel);
    }
}
