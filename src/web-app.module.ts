import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { CoreModule } from './modules/core/core.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [ApiModule, ConfigModule, CoreModule],
})
export class WebAppModule {}
