import { Controller } from '@nestjs/common';
import { PersonService } from './person.service';
import { BaseController } from '@base/base.controller';
import { PersonDocument } from './schemas/person.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController extends BaseController<PersonDocument> {
    constructor(private readonly personService: PersonService) {
        super(personService);
    }
}
