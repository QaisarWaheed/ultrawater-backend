/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOpeningBalanceDto {
  @ApiProperty({ required: false, description: 'Credit amount for opening balance' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  credit?: number;

  @ApiProperty({ required: false, description: 'Debit amount for opening balance' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  debit?: number;
}
