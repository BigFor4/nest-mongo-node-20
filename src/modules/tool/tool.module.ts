import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { ToolController } from './tool.controller';
import { JwtConfig } from '@configs/jwt.config';
import { RegistryModule } from '@modules/registry/registry.module';
import { GlobalStateService } from '@configs/globalState.service';
import { TableModule } from '@modules/table/table.module';
import { MetaModule } from '@modules/meta/meta.module';

@Module({
    imports: [JwtConfig, RegistryModule, TableModule, MetaModule],
    controllers: [ToolController],
    providers: [ToolService, GlobalStateService],
    exports: [],
})
export class ToolModule {}
