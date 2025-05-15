import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(
                    'JWT_SECRET',
                    'default_secret'
                ),
                signOptions: { expiresIn: '1d' },
            }),
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfig {}
