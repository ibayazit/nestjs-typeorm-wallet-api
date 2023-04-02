import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsNotEmpty,
	Validate
} from 'class-validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';

export class CreateCurrencyDto {
	@ApiProperty({ example: 'USD' })
    @Transform(({ value }) => value?.toUpperCase().trim())
    @IsNotEmpty()
    @Validate(IsNotExist, ['Currency'], {
		message: 'codeAlreadyExists',
	})
	code: string;

	@ApiProperty({ example: 'United States Dollar' })
    @IsNotEmpty()
	title: string;

	@ApiProperty({ example: '19.50' })
	@Transform(({ value }) => +value)
	@IsNotEmpty()
	buying_rate: number;

	@ApiProperty({ example: '19.00' })
	@Transform(({ value }) => +value)
    @IsNotEmpty()
	selling_rate: number;
}