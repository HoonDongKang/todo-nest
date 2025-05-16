import { Injectable } from '@nestjs/common';

@Injectable()
export class AService {
  private count = 0;

  increaseCount() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}
