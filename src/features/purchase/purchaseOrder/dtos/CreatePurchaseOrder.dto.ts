/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

import { Product } from "src/features/products/entities/Product.entity"

import { Supplier } from "../../supplier/supplier.entity";

export class CreatePurchaseOrderDto {

    poNumber: string;

    @ApiProperty()
    poDate: Date;

    @ApiProperty()
    expectedDelivery: Date

    @ApiProperty({ type: Object })
    supplier: Supplier

    @ApiProperty()
    products: Product[]

    @ApiProperty()
    remarks: string

    subTotal: number

    total: number
}