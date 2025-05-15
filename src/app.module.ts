import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs/database.module';
import { UserModule } from '@modules/user/user.module';
import * as Joi from 'joi';
import { AuthModule } from '@modules/auth/auth.module';
import { TableModule } from '@modules/table/table.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            ignoreEnvFile: true,
            validationSchema: Joi.object({
                DATABASE_URI: Joi.string().uri().required(),
                PORT: Joi.number().required(),
                HOST: Joi.string().required(),
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .required(),
            }),
        }),
        DatabaseModule,
        AuthModule,
        UserModule,
        TableModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
