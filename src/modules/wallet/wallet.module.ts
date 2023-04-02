import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ProcesslogModule } from '../processlog/processlog.module';
import { CurrencyModule } from '../currency/currency.module';
import { IsExist } from '../../utils/validators/is-exists.validator';
import { IsNotExist } from '../../utils/validators/is-not-exists.validator';

@Module({
  imports: [
    ProcesslogModule,
    CurrencyModule,
    TypeOrmModule.forFeature([Wallet])
  ],
  controllers: [WalletController],
  providers: [IsExist, IsNotExist, WalletService]
})
export class WalletModule { }
