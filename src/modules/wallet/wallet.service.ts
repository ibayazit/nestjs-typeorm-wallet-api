import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { Repository } from 'typeorm';
import { ProcesslogService } from '../processlog/processlog.service';
import { CurrencyService } from '../currency/currency.service';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { ExchangeWalletDto } from './dto/exchange-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private processlogService: ProcesslogService,
    private currencyService: CurrencyService
  ) { }

  // Log
  private log(data) {
    this.processlogService.create(data)
  }

  // Create new wallet record
  private createWalletRecord(data) {
    return this.walletRepository.save(
      this.walletRepository.create({
        user_id: data.user_id,
        currency_id: data.currency_id,
        balance: data.amount
      })
    )
  }

  // Increase or create wallet record
  private increaseBalance(process, walletRecord, data) {
    this.log({
      process,
      user_id: data.user_id,
      currency_id: data.currency_id ?? walletRecord.currency_id,
      amount: data.amount
    })

    if (walletRecord) {
      walletRecord.balance = (walletRecord.balance * 1) + data.amount;

      return this.walletRepository.save(walletRecord);
    }
    else {
      return this.createWalletRecord({ currency_id: data.currency_id ?? walletRecord.currency_id, ...data })
    }
  }

  // Decrease existing wallet record
  private decreaseBalance(process, walletRecord, data) {
    const newBalance = (walletRecord.balance * 1) + (data.amount * -1);

    if (newBalance < 0) {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Insufficient balance',
      },
        HttpStatus.UNPROCESSABLE_ENTITY);
    }

    this.log({
      process,
      user_id: data.user_id,
      currency_id: data.currency_id ?? walletRecord.currency_id,
      amount: data.amount * -1
    })

    walletRecord.balance = newBalance;
    return this.walletRepository.save(walletRecord);

  }

  async deposit(user_id, createWalletDto: CreateWalletDto) {
    const foundWalletRecord = await this.findOne({ user_id, currency_id: createWalletDto.currency_id });

    return this.increaseBalance('DEPOSIT', foundWalletRecord, { user_id, ...createWalletDto });
  }

  async withdraw(user_id, createWalletDto: CreateWalletDto) {
    const foundWalletRecord = await this.findOne({ user_id, currency_id: createWalletDto.currency_id });

    return this.decreaseBalance('WITHDRAW', foundWalletRecord, { user_id, ...createWalletDto });
  }

  async exchange(user_id, createWalletDto: ExchangeWalletDto) {
    // Find existing wallet records
    const fromWalletRecord = await this.findOne({ user_id, currency_id: createWalletDto.from_currency_id });
    const toWalletRecord = await this.findOne({ user_id, currency_id: createWalletDto.to_currency_id });

    // Find currency records
    const fromCurrencyRecord = await this.currencyService.findOne({ id: createWalletDto.from_currency_id });
    const toCurrencyRecord = await this.currencyService.findOne({ id: createWalletDto.to_currency_id });

    const fromAmount = createWalletDto.amount + (createWalletDto.amount * (fromCurrencyRecord.selling_rate / 100));
    const toAmount = createWalletDto.amount - (createWalletDto.amount * (toCurrencyRecord.buying_rate / 100));

    return {
      from: await this.decreaseBalance('EXCHANGE', fromWalletRecord, { user_id, ...createWalletDto, amount: fromAmount }),
      to: await this.increaseBalance('EXCHANGE', toWalletRecord, { user_id, ...createWalletDto, amount: toAmount })
    };
  }

  findOne(fields: EntityCondition<Wallet>) {
    return this.walletRepository.findOne({
      where: fields,
    });
  }

  findAll(fields: EntityCondition<Wallet>) {
    return this.walletRepository.find({
      where: fields,
    })
  }
}
