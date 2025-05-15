import { Module } from '@nestjs/common';
import { BController } from './b.controller';
import { CController } from './c.controller';
import { AService } from './a.service';

@Module({
  imports: [],
  controllers: [BController, CController],
  providers: [AService],
})
export class CountingModule {}
