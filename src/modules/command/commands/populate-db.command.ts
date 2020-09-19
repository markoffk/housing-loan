import { Command, Console } from 'nestjs-console';

import { LoanConfigRepository } from '../../core/modules/db/repositories/public-schema/loan-config.repository';
import { LoanConfigEntity } from '../../core/modules/db/entities/public-schema/loan-config.entity';

@Console()
export class PopulateDbCommand {
  constructor(private readonly loanConfigRepository: LoanConfigRepository) {}

  @Command({
    command: 'app:populate-db',
    description: 'Populate DB with test data',
  })
  async populate() {
    console.log(`Populating...`);
    await this.createInitialLoanConfig();

    process.exit(0);
  }

  private async createInitialLoanConfig() {
    if (!(await this.getInitialLoanConfig())) {
      const clientEntity = this.loanConfigRepository.create({
        interest: 3.5,
        systemName: 'housing1',
        name: 'Housing loan',
        description: 'Housing loan',
      });

      await this.loanConfigRepository.save(clientEntity);
    }
  }

  private async getInitialLoanConfig(): Promise<LoanConfigEntity | undefined> {
    return this.loanConfigRepository.findOne({
      where: { systemName: 'housing1' },
    });
  }
}
