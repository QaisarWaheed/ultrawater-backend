/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type Unit = 'ft' | 'pcs' | 'kg' | 'm' | 'sqft';

export type Color =
  | 'DULL'
  | 'H23/PC‐RAL'
  | 'SAHRA/BRN'
  | 'BLACK/MULTI'
  | 'WOODCOAT';

@Schema({ timestamps: true })
export class Product {
  declare _id: mongoose.Types.ObjectId;

  @ApiProperty()
  @Prop({ required: true })
  itemName: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  category: string;

  @ApiProperty()
  @Prop()
  thickness: number;

  @ApiProperty()
  @Prop()
  length: number;

  @ApiProperty()
  @Prop({ enum: ['ft', 'pcs', 'kg', 'm', 'sqft'] })
  unit: Unit;

  @Prop()
  color: Color;

  @ApiProperty()
  @Prop()
  salesRate: number;

  @Prop()
  @ApiProperty()
  @Prop()
  openingStock: number;

  @ApiProperty()
  @Prop()
  minimumStockLevel: number;

  @ApiProperty()
  @Prop()
  description: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

const productSchema = SchemaFactory.createForClass(Product);
export { productSchema };
