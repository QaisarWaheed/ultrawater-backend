import { ApiProperty } from '@nestjs/swagger';
import type { Color, Unit } from '../entities/Product.entity';

export class CreateProductDto {
  @ApiProperty()
  itemName: string;

  @ApiProperty()
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
