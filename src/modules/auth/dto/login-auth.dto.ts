import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Transform } from 'class-transformer';

export class LoginAuthDto {
  @ApiProperty({ example: 'ibrbayazit@gmail.com' })
  @Transform(({ value }) => value.toLowerCase().trim())
  @Validate(IsExist, ['User'], {
    message: 'emailNotExists',
  })
  email: string;

  @ApiProperty({ example: '123123' })
  @IsNotEmpty()
  password: string;
}
