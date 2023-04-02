import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';

export class ExchangeWalletDto {
    @ApiProperty({ example: '1' })
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    @Validate(IsExist, ['Currency', 'id'], {
        message: 'currencyNotExists',
    })
    from_currency_id: number;

    @ApiProperty({ example: '2' })
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    @Validate(IsExist, ['Currency', 'id'], {
        message: 'currencyNotExists',
    })
    to_currency_id: number;

    @ApiProperty({ example: '10' })
    @Transform(({ value }) => +value)
    @IsNotEmpty()
    amount: number;
}