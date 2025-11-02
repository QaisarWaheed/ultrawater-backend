import { ApiProperty } from '@nestjs/swagger';
import type { paymentMethodType } from 'src/features/sales/salesInvoice/salesinvoice.entity';

export class CreateRecipetVoucherDto {
  voucherNumber: string;

  @ApiProperty()
  voucherDate: Date;

  @ApiProperty()
  receivedFrom: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  referenceNumber: string;

  @ApiProperty()
  paymentMode: paymentMethodType;

  @ApiProperty()
  remarks?: string;
}
