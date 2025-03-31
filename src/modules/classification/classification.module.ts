import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';
import { Classification, ClassificationSchema } from './schemas/classification.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Classification.name, schema: ClassificationSchema }]),
    ],
    controllers: [ClassificationController],
    providers: [ClassificationService],
    exports: [ClassificationService],
})
export class ClassificationModule {}
