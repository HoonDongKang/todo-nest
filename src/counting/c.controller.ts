import { Controller, Get } from '@nestjs/common';
import { AService } from './a.service';

// c.controller.ts
@Controller()
export class CController {
  constructor(private readonly aService: AService) {}

  @Get('count')
  getCount() {
    return `Current count in C: ${this.aService.getCount()}`;
  }
}
