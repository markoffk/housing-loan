import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { ConfigModule } from './modules/config/config.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [CommandModule, ConfigModule, CoreModule],
})
export class ConsoleAppModule {}
