import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export type paymentType = 'Credit' |'Debit';

@Schema({timestamps:true})
export class Customer {

declare _id: mongoose.Types.ObjectId;
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
@Prop({required:true}   )
address: string;

@ApiProperty()
@Prop({required:true})
city: string;

@ApiProperty()
@Prop({required:true})
gstNumber: number;
@ApiProperty()
@Prop( {required:true})
openingAmount: number;

@ApiProperty()
@Prop({required:true})
creditLimit: number;

@ApiProperty()
@Prop({required:true})
paymentType: paymentType;

declare createdAt: Date;

declare updatedAt: Date;


}
const customerSchema = SchemaFactory.createForClass(Customer);

export default customerSchema;