/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/features/products/entities/Product.entity';
import { Customer } from '../customer/entities/customer.entity';

export class CreateQuotationDto {

  @ApiProperty()
  quotationDate: Date;
  @ApiProperty()
  quotationNumber: string;

  @ApiProperty()
  products: Product[];

  @ApiProperty()
  length: string;

  @ApiProperty({ type: [Object], description: 'Array of customer objects' })
  customer: Customer;

  @ApiProperty()
  remarks: string;

  subTotal: number;

  totalGrossAmount: number;

  totalDiscount: number;

  totalNetAmount: number;

  discount: number

}
