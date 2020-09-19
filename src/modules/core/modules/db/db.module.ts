import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as typeormConfig from './typeorm-config';
import { LoanConfigRepository } from './repositories/public-schema/loan-config.repository';

const typeOrmModuleForRoot = TypeOrmModule.forRoot(typeormConfig);

const typeOrmModuleForFeature = TypeOrmModule.forFeature([
  LoanConfigRepository,
]);

const services = [];

@Module({
  imports: [typeOrmModuleForRoot, typeOrmModuleForFeature],
  providers: [...services],
  exports: [typeOrmModuleForRoot, typeOrmModuleForFeature, ...services],
})
export class DbModule {}
