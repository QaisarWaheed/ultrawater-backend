import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import type { paymentType } from "src/features/sales/customer/entities/customer.entity";


@Schema({timestamps:true})
export class Supplier{
    
    declare _id:mongoose.Types.ObjectId;

    @ApiProperty()
    @Prop({required:true})
    supplierCode: number;


    @ApiProperty()
    @Prop({required:true})
    name: string;

    @ApiProperty()
    @Prop({required:true})
    phone: string;

    @ApiProperty()
    @Prop({required:true})
    email: string;

    @ApiProperty()
    @Prop({required:true})
    address: string;

    @ApiProperty()
    @Prop({required:true})
    city: string;

    @ApiProperty()
    @Prop({required:true})
    gstNumber: number;

    @ApiProperty()
    @Prop({required:true})
    openingBalance: number;

    @ApiProperty()
    @Prop({required:true})
    paymentType: paymentType;

    declare createdAt: Date;

    declare updatedAt: Date;

    
}
const SupplierSchema = SchemaFactory.createForClass(Supplier);
export {SupplierSchema};