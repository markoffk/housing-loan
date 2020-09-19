import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { CoreModule } from '../core/core.module';
import { ConfigModule } from '../config/config.module';
import { PopulateDbCommand } from './commands/populate-db.command';

@Module({
  imports: [ConsoleModule, CoreModule, ConfigModule],
  providers: [PopulateDbCommand],
  exports: [PopulateDbCommand],
})
export class CommandModule {}
