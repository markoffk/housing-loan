import { Module } from '@nestjs/common';
import { DbModule } from './modules/db/db.module';
import { PaymentCalculationModule } from './modules/payment-calculation/payment-calculation.module';

@Module({
  imports: [DbModule, PaymentCalculationModule],
  providers: [],
  exports: [DbModule, PaymentCalculationModule],
})
export class CoreModule {}
