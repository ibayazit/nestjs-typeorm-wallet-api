import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
  ) { }

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesRepository.save(
      this.currenciesRepository.create(createCurrencyDto)
    )
  }

  findAll() {
    return this.currenciesRepository.find()
  }

  findOne(fields: EntityCondition<Currency>) {
    return this.currenciesRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesRepository.save(
      this.currenciesRepository.create({
        id,
        ...updateCurrencyDto,
      }),
    );
  }

  async remove(id: number) {
    const deleted = await this.currenciesRepository.delete(id);

    return deleted.affected > 0
  }
}