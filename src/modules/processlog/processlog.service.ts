import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processlog } from './entities/processlog.entity';
import { CreateProcesslogDto } from './dto/create-processlog.dto';

@Injectable()
export class ProcesslogService {
  constructor(
    @InjectRepository(Processlog)
    private processlogRepository: Repository<Processlog>,
  ) { }

  create(createProcesslogDto: CreateProcesslogDto) {
    return this.processlogRepository.save(
      this.processlogRepository.create(createProcesslogDto)
    )
  }

  findAll() {
    return this.processlogRepository.find()
  }
}
