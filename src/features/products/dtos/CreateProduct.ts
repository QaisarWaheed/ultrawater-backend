import { ApiProperty } from '@nestjs/swagger';
import type { Color, Unit } from '../entities/Product.entity';

// category will now be the Category document id (string)
export class CreateProductDto {
  // itemCode is generated automatically; clients should not provide it
  itemCode?: string;

  @ApiProperty()
  itemName: string;

  @ApiProperty({ description: 'Category id (ObjectId string)' })
  category: string;

  @ApiProperty()
  thickness: number;

  @ApiProperty()
  unit: Unit;

  @ApiProperty()
  salesRate: number;

  @ApiProperty()
  color: Color;

  @ApiProperty()
  openingStock: number;

  @ApiProperty()
  minimumStockLevel: number;

  @ApiProperty()
  description: string;
}
