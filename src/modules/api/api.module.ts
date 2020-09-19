import { Module } from '@nestjs/common';
import { RootController } from './controllers/root.controller';
import { AmortizationTableController } from './controllers/amortization-table/amortization-table.controller';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [RootController, AmortizationTableController],
  imports: [CoreModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
