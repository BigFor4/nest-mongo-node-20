import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtConfig } from '@configs/jwt.config';
@Module({
    imports: [JwtConfig, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
