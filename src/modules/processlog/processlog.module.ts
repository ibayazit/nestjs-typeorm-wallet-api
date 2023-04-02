import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processlog } from './entities/processlog.entity';
import { ProcesslogService } from './processlog.service';
import { ProcesslogController } from './processlog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Processlog])],
  controllers: [ProcesslogController],
  providers: [ProcesslogService],
  exports: [ProcesslogService]
})
export class ProcesslogModule {}
