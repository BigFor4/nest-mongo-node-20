import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { JwtConfig } from '@configs/jwt.config';
import { RegistryModule } from '@modules/registry/registry.module';
import { GlobalStateService } from '@configs/globalState.service';

@Module({
    imports: [JwtConfig, RegistryModule],
    controllers: [ToolController],
    providers: [ToolService, GlobalStateService],
    exports: [],
})
export class ToolModule {}
