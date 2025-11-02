/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "src/features/products/entities/Product.entity";
import { Supplier } from "../../supplier/supplier.entity";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class PurchaseReturn {


    declare _id: mongoose.Types.ObjectId

    @Prop()
    returnNumber: string

    @Prop()
    returnDate: Date

    @Prop()
    supplier: Supplier[]

    @Prop()
    products: Product[]


    @Prop()
    reason: string

    @Prop()
    subTotal: number

    @Prop()
    total: number

    declare createAt: Date

    declare updatedAt: Date


}

const purchaseReturnSchema = SchemaFactory.createForClass(PurchaseReturn)
export default purchaseReturnSchema