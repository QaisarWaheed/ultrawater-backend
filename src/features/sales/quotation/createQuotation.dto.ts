import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/features/products/entities/Product.entity';
import { Customer } from '../customer/entities/customer.entity';

export class CreateQuotationDto {
  @ApiProperty({ required: true })
  quotationDate: Date;

  @ApiProperty({ required: true })
  validUntil: Date;

  @ApiProperty({ required: true })
  products: Product[];

  @ApiProperty()
  customer: Customer;

  @ApiProperty({ required: true })
  remarks: string;

  subTotal: number;

  totalGrossAmmount: number;

  totalDiscount: number;

  totalNetAmmount: number;
}
