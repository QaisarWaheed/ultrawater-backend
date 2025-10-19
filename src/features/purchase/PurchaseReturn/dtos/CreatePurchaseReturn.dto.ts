import { ApiProperty } from "@nestjs/swagger";
import { Supplier } from "../../supplier/supplier.entity";
import { Product } from "src/features/products/entities/Product.entity";

export class CreatePurchaseReturnDto{

  @ApiProperty()
  returnNumber: number;

  @ApiProperty()
  returnDate: Date;

 

  @ApiProperty()
  supplier: Supplier;

  @ApiProperty()
  products: Product[];

  @ApiProperty()
  reason: string;

  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  total: number;


}