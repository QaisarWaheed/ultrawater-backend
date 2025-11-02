/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentVoucherDto {
    @ApiProperty({ required: true })
    voucherNumber: string;

    @ApiProperty({ required: true })
    voucherDate: Date;

    @ApiProperty({ required: true })
    paidTo: string;

    @ApiProperty({ required: true })
    amount: number;

    @ApiProperty({ required: true })
    referenceNumber: string;

    @ApiProperty({ required: true })
    paymentMode: string;

    @ApiProperty({ required: false })
    remarks?: string;
}