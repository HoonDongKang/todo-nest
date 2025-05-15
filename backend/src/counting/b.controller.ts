import { Controller, Get } from '@nestjs/common';
import { AService } from './a.service';

// b.controller.ts
@Controller()
export class BController {
  constructor(private readonly aService: AService) {}

  @Get('increase')
  increase() {
    this.aService.increaseCount();
    return 'Count increased in B';
  }
}
