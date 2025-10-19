import { ApiProperty } from '@nestjs/swagger';
import  type { paymentType } from 'src/features/sales/customer/entities/customer.entity';

export class CreateSupplierDto {

  
  @ApiProperty()
  supplierCode: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  gstNumber: number;

  @ApiProperty()
  openingBalance: number;

  @ApiProperty()
  paymentType: paymentType;
}
