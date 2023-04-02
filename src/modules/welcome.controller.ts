import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Welcome')
@Controller()
export class WelcomeController {
  @Get('/')
  getHello(): object {
    return {
      name: 'İbrahim',
      surname: 'Bayazit',
      email: 'ibrbayazit@gmail.com',
      github: 'https://github.com/ibayazit'
    };
  }
}
