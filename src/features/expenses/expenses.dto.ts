import { ApiProperty } from "@nestjs/swagger";
import type { paymentMethodType } from "../sales/salesInvoice/salesinvoice.entity";


export class CreateExpensesDto {


    @ApiProperty()
    expenseNumber: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    paymentMethod: paymentMethodType;

    @ApiProperty()
    reference: string;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    categoryType: string;



}