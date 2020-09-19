import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { WebAppModule } from '../../src/web-app.module';
import { INestApplication } from '@nestjs/common';
import { amortizationTableCreateResponse } from './ammortization-table.responses';
import { LoanConfigRepository } from '../../src/modules/core/modules/db/repositories/public-schema/loan-config.repository';
import { LoanConfigEntity } from '../../src/modules/core/modules/db/entities/public-schema/loan-config.entity';

describe('AmortizationTableController (e2e)', () => {
  let app: INestApplication;
  const loanConfigRepository = {
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
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [WebAppModule],
    })
      .overrideProvider(LoanConfigRepository)
      .useValue(loanConfigRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/amortization-table')
      .send({
        loanConfig: 'housing1',
        amountOfYears: 25,
        installmentType: 'equal',
        amountOfMoney: 300000,
      })
      .expect(201)
      .expect(amortizationTableCreateResponse);
  });
});
