import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/features/products/entities/Product.entity";
import type { paymentMethodType } from "./salesinvoice.entity";
import { Customer } from "../customer/entities/customer.entity";





export class CreateSalesInvoiceDto{
@ApiProperty({required:true})
    invoiveDate: Date;


    @ApiProperty()
    paymentMethod: paymentMethodType


   @ApiProperty({required:true})
   products: Product[]
   
   @ApiProperty()
    customerName: string;

    @ApiProperty({required:true})
    remarks: string;

    @ApiProperty()
    length:number

@ApiProperty()
    discount:number


    
    subTotal:number


    totalGrossAmmount:number

    totalDiscount:number

    totalNetAmmount:number

}