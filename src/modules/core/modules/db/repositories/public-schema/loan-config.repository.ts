import { EntityRepository, Repository } from 'typeorm';

import { LoanConfigEntity } from '../../entities/public-schema/loan-config.entity';

@EntityRepository(LoanConfigEntity)
export class LoanConfigRepository extends Repository<LoanConfigEntity> {
  async findOneBySystemName(systemName: string): Promise<LoanConfigEntity> {
    return this.findOneOrFail({ where: { systemName } });
  }
}
