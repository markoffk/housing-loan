import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { AmortizationTableGeneratorService } from './service/amortization-table-generator/amortization-table-generator.service';

@Module({
  imports: [DbModule],
  providers: [AmortizationTableGeneratorService],
  exports: [AmortizationTableGeneratorService],
})
export class PaymentCalculationModule {}
