import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { mongo } from "mongoose";



export type Category = 'Sections' | 'Channels' | 'Accessories' | 'Glass';

export type Unit = 'ft' | 'pcs' | 'kg' | 'm' | 'sqft';

@Schema({timestamps: true})
export class Product{

    declare _id: mongoose.Types.ObjectId;
 
    @ApiProperty()
    @Prop()
    itemCode: string;

    @ApiProperty()
    @Prop()
    itemName: string;

    @ApiProperty()
    @Prop({ enum: ['Sections', 'Channels', 'Accessories', 'Glass'] })
    category: Category;

    @ApiProperty()
    @Prop()
    brand: string;

    @ApiProperty()
    @Prop()
    thickness: number;

    @ApiProperty()
    @Prop()
    length: number;

    @ApiProperty()
    @Prop({ enum: ['ft', 'pcs', 'kg', 'm', 'sqft'] })
    unit: Unit;

    @ApiProperty()
    @Prop()
    purchaseRate: number;

    @ApiProperty()
    @Prop()
    salesRate: number;

    @ApiProperty()
    @Prop()
    oldPrice: number;

    @ApiProperty()
    @Prop()
    newPrice: number;

    @ApiProperty()
    @Prop()
    openingStock: number;

    @ApiProperty()
    @Prop()
    minimumStock: number;

    @ApiProperty()
    @Prop()
    description: string;

    declare createdAt: Date;

    declare updatedAt: Date;
}

const productSchema = SchemaFactory.createForClass(Product);
export { productSchema };