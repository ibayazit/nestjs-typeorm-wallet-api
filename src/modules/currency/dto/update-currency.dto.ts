import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrencyDto } from './create-currency.dto';
import { Transform } from 'class-transformer';
import {
	IsNotEmpty,
	Validate
} from 'class-validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {
	@ApiProperty({ example: 'USD' })
    @Transform(({ value }) => value?.toUpperCase().trim())
    @IsNotEmpty()
    @Validate(IsNotExist, ['Currency'], {
		message: 'codeAlreadyExists',
	})
	code: string | null;

	@ApiProperty({ example: 'United States Dollar' })
    @IsNotEmpty()
	title: string | null;

	@ApiProperty({ example: '19.50' })
	@Transform(({ value }) => +value)
    @IsNotEmpty()
	buying_rate: number | null;

	@ApiProperty({ example: '19.00' })
	@Transform(({ value }) => +value)
    @IsNotEmpty()
	selling_rate: number | null;
}