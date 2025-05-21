import { Controller, Get, Req, Request, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { Request as expressRequest } from 'express';

@Controller('me')
@UseGuards(JwtGuard)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get('/')
  async getInfo(@Request() req: expressRequest) {
    const payload = req['user'];

    return this.meService.getInfo(payload.sub);
  }
}
