import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person, PersonSchema } from './schemas/person.schema';
import { JwtConfig } from '@configs/jwt.config';

@Module({
    imports: [
        JwtConfig,
        MongooseModule.forFeature([
            { name: Person.name, schema: PersonSchema },
        ]),
    ],
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {}
