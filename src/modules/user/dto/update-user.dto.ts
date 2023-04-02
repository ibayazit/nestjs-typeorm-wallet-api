import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength, Validate } from 'class-validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'ibrbayazit@gmail.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty({ example: '123123' })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'ibrahim' })
  @IsOptional()
  firstName?: string | null;

  @ApiProperty({ example: 'bayazit' })
  @IsOptional()
  lastName?: string | null;
}
