import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type Category = mongoose.Types.ObjectId | string;

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
  @Prop({ required: true, unique: true })
  itemCode: string;

  @ApiProperty()
  @Prop({ required: true })
  itemName: string;

  // Reference to dynamic Category collection
  @ApiProperty({ type: String })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
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

  @Prop()
  color: Color;

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
