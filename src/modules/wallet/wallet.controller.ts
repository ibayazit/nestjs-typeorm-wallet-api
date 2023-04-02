import { Controller, Request, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ExchangeWalletDto } from './dto/exchange-wallet.dto';

@ApiBearerAuth()
@ApiTags('Wallet')
@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  myWallet(@Request() request) {
    return this.walletService.findAll({
      user_id: request.user.id
    });
  }

  @Post('/deposit')
  deposit(@Body() createWalletDto: CreateWalletDto, @Request() request) {
    const user_id = request.user.id;
    return this.walletService.deposit(user_id, createWalletDto);
  }

  @Post('/withdraw')
  withdraw(@Body() createWalletDto: CreateWalletDto, @Request() request) {
    const user_id = request.user.id;
    return this.walletService.withdraw(user_id, createWalletDto);
  }

  @Post('/exchange')
  exchange(@Body() exchangeWalletDto: ExchangeWalletDto, @Request() request) {
    const user_id = request.user.id;
    return this.walletService.exchange(user_id, exchangeWalletDto);
  }
}
