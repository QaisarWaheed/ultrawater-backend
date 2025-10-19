import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '../../supplier/supplier.entity';
import { Product } from 'src/features/products/entities/Product.entity';

export class CreatePurchaseInvoicDto {
  invoiceNumber: number;

  @ApiProperty()
  invoiceDate: Date;

  @ApiProperty()
  grnNumber?: number;

  @ApiProperty()
  supplier: Supplier;

  @ApiProperty()
  products: Product[];

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total: number;
}
