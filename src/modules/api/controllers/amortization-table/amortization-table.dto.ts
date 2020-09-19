import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InstallmentTypeEnum } from '../../../core/modules/db/enums/installment-type.enum';
import { LoanInputDataInterface } from '../../../core/modules/payment-calculation/service/amortization-table-generator/amortization-table-generator.interface';

export class AmortizationTableCreateDto implements LoanInputDataInterface {
  @IsNotEmpty()
  @IsString()
  public readonly loanConfig: string;

  @IsNotEmpty()
  @IsNumber()
  public readonly amountOfMoney: number;

  @IsNotEmpty()
  @IsInt()
  public readonly amountOfYears: number;

  @IsNotEmpty()
  /**
   * @todo support decreasing installment
   */
  @IsIn([InstallmentTypeEnum.Equal])
  public readonly installmentType: InstallmentTypeEnum;
}
