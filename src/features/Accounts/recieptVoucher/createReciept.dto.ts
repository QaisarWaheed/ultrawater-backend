import { ApiProperty } from '@nestjs/swagger';
import type { paymentMethodType } from 'src/features/sales/salesInvoice/salesinvoice.entity';

export class CreateRecipetVoucherDto {
  voucherNumber: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  recievedFrom: string;

  @ApiProperty()
  ammount: number;

  @ApiProperty()
  referenceNumber: string;

  @ApiProperty()
  paymentMode: paymentMethodType;

  @ApiProperty()
  remarks?: string;
}
