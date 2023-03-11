import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Address } from './dtos/Address.dto';
import { RequestTokens } from './dtos/RequestToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contract-address')
  getContractAddress(): Address {
    return  new Address(this.appService.getContractAddress());
  }

  @Get('total-supply')
  getTotalSupply(): Promise<number>{
    return this.appService.getTotalSupply();
  }

  @Get('total-allowance')
  getAllowance(
    @Query('from') from: string,
    @Query('to') to: string
  ): Promise<number>{
    return this.appService.getAllowance(from, to);
  }

  @Get('transaction/:hash')
  getTransaction(@Param('hash') hash: string) {
    return this.appService.getTransaction(hash);
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokens) {
    return this.appService.requestTokens(body.address, body.amount);
  }
}


