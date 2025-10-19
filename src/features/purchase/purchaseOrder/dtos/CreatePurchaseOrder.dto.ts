import { ApiProperty } from "@nestjs/swagger"
import { Supplier } from "../../supplier/supplier.entity"
import { Product } from "src/features/products/entities/Product.entity"

export class CreatePurchaseOrderDto{
    
    poNumber:number
    
    @ApiProperty()
    poDate:Date
    
    @ApiProperty()
    expectedDelivery:Date
    
    @ApiProperty()
    supplier:Supplier
    
    @ApiProperty()
    products:Product[]
    
    @ApiProperty()
    remarks:string
    
    subTotal:number
    
    total:number
}