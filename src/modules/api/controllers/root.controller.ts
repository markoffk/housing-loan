import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  get() {
    return 'This is root API endpoint which has no any function.';
  }
}
