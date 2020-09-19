import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AmortizationTableCreateDto } from './amortization-table.dto';
import { AmortizationTableGeneratorService } from '../../../core/modules/payment-calculation/service/amortization-table-generator/amortization-table-generator.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Controller('amortization-table')
export class AmortizationTableController {
  constructor(
    private readonly amortizationTableGeneratorService: AmortizationTableGeneratorService,
  ) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: AmortizationTableCreateDto) {
    try {
      return await this.amortizationTableGeneratorService.createAmortizationTable(
        body,
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException();
      } else {
        throw e;
      }
    }
  }
}
