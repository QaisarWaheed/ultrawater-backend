import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/features/products/entities/Product.entity';
import { Customer } from '../customer/entities/customer.entity';

export class CreateQuotationDto {
  @ApiProperty({ required: true })
  quotationDate: Date;

 

  @ApiProperty({ required: true })
  products: Product[];

  @ApiProperty()
  customer: string;

  @ApiProperty()
  remarks: string;

  subTotal: number;

  totalGrossAmmount: number;

  totalDiscount: number;

  totalNetAmmount: number;

  discount:number

}
