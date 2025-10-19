import mongoose, { mongo } from "mongoose";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Supplier } from "../../supplier/supplier.entity";
import { Product } from "src/features/products/entities/Product.entity";

@Schema({timestamps:true})
export class PurchaseInvoice {

declare _id: mongoose.Types.ObjectId

@Prop()
invoiceNumber:number

@Prop()
invoiceDate: Date

@Prop()
grnNumber?: number

@Prop()
supplier: Supplier

 @Prop()
 products : Product[]

 @Prop()
 remarks:string

 @Prop()
 subTotal:number

 @Prop()
 discount:number

 @Prop()
 total:number

 declare createAt:Date

 declare updatedAt: Date

}

const purchaseInvoiceSchema = SchemaFactory.createForClass(PurchaseInvoice)
export default purchaseInvoiceSchema