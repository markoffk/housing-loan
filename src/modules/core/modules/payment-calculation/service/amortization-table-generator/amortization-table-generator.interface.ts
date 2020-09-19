import { InstallmentTypeEnum } from '../../../db/enums/installment-type.enum';

export interface LoanInputDataInterface {
  loanConfig: string;

  amountOfMoney: number;

  amountOfYears: number;

  installmentType: InstallmentTypeEnum;
}

export interface AmortizationTableItemInterface {
  payment: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}
