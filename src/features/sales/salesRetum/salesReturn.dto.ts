import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/features/products/entities/Product.entity';
import type { paymentMethodType } from './salesReturn.entity';
import { Customer } from '../customer/entities/customer.entity';

export class CreateSalesReturnDto {

 @ApiProperty()
 invoiceNumber:number


 @ApiProperty({required:true})
     invoiveDate: Date;
 
 
     @ApiProperty()
     paymentMethod: paymentMethodType
 
 
    @ApiProperty({required:true})
    products: Product[]
    
    @ApiProperty()
    customer:Customer
 
     @ApiProperty({required:true})
     remarks: string;
 
 
     subTotal:number
 
     totalGrossAmmount:number
 
     totalDiscount:number
 
     totalNetAmmount:number
}
