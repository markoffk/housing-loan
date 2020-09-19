import { Test, TestingModule } from '@nestjs/testing';

import { AmortizationTableGeneratorService } from './amortization-table-generator.service';
import { LoanConfigRepository } from '../../../db/repositories/public-schema/loan-config.repository';
import { InstallmentTypeEnum } from '../../../db/enums/installment-type.enum';
import { amortizationTableCreateResponse } from '../../../../../../../test/ammortication-table/ammortization-table.responses';
import { LoanConfigEntity } from '../../../db/entities/public-schema/loan-config.entity';

describe('AmortizationTableGeneratorService', () => {
  let service: AmortizationTableGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmortizationTableGeneratorService,
        {
          provide: LoanConfigRepository,
          useValue: {
            findOneBySystemName: async (
              systemName: string,
            ): Promise<LoanConfigEntity> => {
              if (systemName === 'housing1') {
                return {
                  id: 1,
                  interest: 3.5,
                  systemName: 'housing1',
                  name: 'Housing loan',
                  description: 'Housing loan',
                };
              }
            },
          },
        },
      ],
    }).compile();

    service = module.get<AmortizationTableGeneratorService>(
      AmortizationTableGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return proper result', async () => {
    const actualResult = await service.createAmortizationTable({
      loanConfig: 'housing1',
      amountOfYears: 25,
      installmentType: InstallmentTypeEnum.Equal,
      amountOfMoney: 300000,
    });
    expect(actualResult).toEqual(amortizationTableCreateResponse);
  });
});
