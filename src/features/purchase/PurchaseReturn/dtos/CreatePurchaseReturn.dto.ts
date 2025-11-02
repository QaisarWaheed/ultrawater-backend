/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "../../supplier/supplier.entity";
import { Product } from "src/features/products/entities/Product.entity";

export class CreatePurchaseReturnDto {

  @ApiProperty()
  returnNumber: string;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty()
  supplier: Supplier[]

  @ApiProperty()
  products: Product[];

  @ApiProperty()
  reason: string;

  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  total: number;


}