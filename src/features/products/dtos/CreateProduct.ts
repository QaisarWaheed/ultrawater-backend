import { ApiProperty } from '@nestjs/swagger';
import type { Category, Unit } from '../entities/Product.entity';

export class CreateProductDto {
  @ApiProperty()
  itemName: string;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  thickness: number;

  @ApiProperty()
  length: number;

  @ApiProperty()
  unit: Unit;

  @ApiProperty()
  purchaseRate: number;

  @ApiProperty()
  salesRate: number;

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  newPrice: number;

  @ApiProperty()
  openingStock: number;

  @ApiProperty()
  minimumStock: number;

  @ApiProperty()
  description: string;
}
