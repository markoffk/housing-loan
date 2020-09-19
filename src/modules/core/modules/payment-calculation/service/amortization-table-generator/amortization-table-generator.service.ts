import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { LoanConfigRepository } from '../../../db/repositories/public-schema/loan-config.repository';
import {
  AmortizationTableItemInterface,
  LoanInputDataInterface,
} from './amortization-table-generator.interface';
import { InstallmentTypeEnum } from '../../../db/enums/installment-type.enum';

@Injectable()
export class AmortizationTableGeneratorService {
  constructor(private readonly loanConfigRepository: LoanConfigRepository) {}

  async createAmortizationTable(
    loanInputData: LoanInputDataInterface,
  ): Promise<AmortizationTableItemInterface[]> {
    const loanConfig = await this.loanConfigRepository.findOneBySystemName(
      loanInputData.loanConfig,
    );

    switch (loanInputData.installmentType) {
      case InstallmentTypeEnum.Equal:
        /**
         * A – amount of money requested
         * n – amount of months
         * R – single payment amount
         *
         * q = 1 + monthlyDecimalInterest
         * R = A * (q^n) * (q-1) / ((q^n)-1)
         */
        const amountOfMonths = loanInputData.amountOfYears * 12;
        const monthlyDecimalInterest = loanConfig.interest / 100 / 12;
        const q = 1 + monthlyDecimalInterest;

        const monthlyPaymentAmount =
          (loanInputData.amountOfMoney *
            Math.pow(q, amountOfMonths) *
            (q - 1)) /
          (Math.pow(q, amountOfMonths) - 1);

        return R.compose<number, number[], AmortizationTableItemInterface[]>(
          R.reduce<number, AmortizationTableItemInterface[]>((acc, value) => {
            const isLastMonth = value === amountOfMonths;
            const previousBalance =
              acc.length > 0
                ? acc[acc.length - 1].balance
                : loanInputData.amountOfMoney;
            const interestPaid =
              Math.round(monthlyDecimalInterest * previousBalance * 100) / 100;

            const paymentAmount = isLastMonth
              ? previousBalance + interestPaid
              : Math.round(monthlyPaymentAmount * 100) / 100;
            const principalPaid = isLastMonth
              ? previousBalance
              : paymentAmount - interestPaid;

            return acc.concat({
              payment: value,
              paymentAmount,
              principalPaid,
              interestPaid,
              balance: previousBalance - principalPaid,
            });
          }, []),
          R.range(1),
        )(amountOfMonths + 1);
      case InstallmentTypeEnum.Decreasing:
        /**
         * @todo implement decreasing installment
         */
        return [];
    }
  }
}
