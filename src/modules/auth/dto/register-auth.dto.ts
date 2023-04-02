import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    MinLength,
    Validate
} from 'class-validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';

export class RegisterAuthDto {
    @ApiProperty({ example: 'ibrahim' })
    @IsNotEmpty()
    first_name: string | null;

    @ApiProperty({ example: 'bayazit' })
    @IsNotEmpty()
    last_name: string | null;

    @ApiProperty({ example: 'ibrbayazit@gmail.com' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsNotEmpty()
    @Validate(IsNotExist, ['User'], {
        message: 'emailAlreadyExists',
    })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123123' })
    @MinLength(6)
    password?: string;
}
