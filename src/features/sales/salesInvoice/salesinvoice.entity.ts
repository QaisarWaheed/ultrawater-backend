import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Product } from 'src/features/products/entities/Product.entity';
import { Customer } from "../customer/entities/customer.entity";

export type paymentMethodType = 'Cash'| 'Card';

@Schema({timestamps:true})
export class SalesInvoice{

    declare _id: mongoose.Types.ObjectId;

    @Prop()
    invoiveNumber: number;

    @Prop()
    invoiveDate: Date;


    @Prop()
    paymentMethod: paymentMethodType


   @Prop()
   products: Product[]
   
   @Prop()
   customerName: string;

    @Prop()
    remarks: string;


    @Prop()
    length:number

    @Prop()
    discount:number

    @Prop()
    amount:number

    @Prop()
    subTotal:number

    @Prop()
    totalGrossAmmount:number

    @Prop()
    totalDiscount:number

    @Prop()
    totalNetAmmount:number

    declare createdAt: Date;

    declare updatedAt: Date;

    
}
const salesInvoiceSchema = SchemaFactory.createForClass(SalesInvoice);

export default salesInvoiceSchema;