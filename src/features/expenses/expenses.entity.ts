import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { mongo } from "mongoose";
import type { paymentMethodType } from "../sales/salesInvoice/salesinvoice.entity";

export type categoryType = 'Rent' | 'utilities' | 'Transportation' | 'Salary' | 'Stationery' | 'Misc';
@Schema({timestamps:true})
export class Expense{

    declare _id: mongoose.Types.ObjectId;

    @Prop({required:true})
    expenseNumber: string;

    @Prop({required:true})
    date: Date;

    @Prop({required:true})
    description: string;

    @Prop({required:true})
    amount: number;

    @Prop({required:true})
    paymentMethod: paymentMethodType;

    @Prop({required:true})
    reference: string;

    @Prop({required:true})
    remarks: string;

    @Prop({required:true})
    categoryType: categoryType;

    declare createdAt: Date;

    declare updatedAt: Date;
    

}
const expenseSchema = SchemaFactory.createForClass(Expense);

export  default expenseSchema;