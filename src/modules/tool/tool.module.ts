import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { JwtConfig } from '@configs/jwt.config';
import { RegistryModule } from '@modules/registry/registry.module';

@Module({
    imports: [JwtConfig, RegistryModule],
    controllers: [ToolController],
    providers: [ToolService],
    exports: [],
})
export class ToolModule {}
