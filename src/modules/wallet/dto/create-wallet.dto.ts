import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';

export class CreateWalletDto {
    @ApiProperty({ example: '1' })
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    @Validate(IsExist, ['Currency', 'id'], {
        message: 'currencyNotExists',
    })
    currency_id: number;

    @ApiProperty({ example: '10' })
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    amount: number;
}