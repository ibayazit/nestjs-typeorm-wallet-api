import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProcesslogService } from './processlog.service';
import { CreateProcesslogDto } from './dto/create-processlog.dto';

@ApiBearerAuth()
@ApiTags('Wallet Process Log')
@UseGuards(AuthGuard('jwt'))
@Controller('wallet/processlog')
export class ProcesslogController {
  constructor(private readonly processlogService: ProcesslogService) {}

  @Post()
  create(@Body() createProcesslogDto: CreateProcesslogDto) {
    return this.processlogService.create(createProcesslogDto);
  }

  @Get()
  findAll() {
    return this.processlogService.findAll();
  }
}
