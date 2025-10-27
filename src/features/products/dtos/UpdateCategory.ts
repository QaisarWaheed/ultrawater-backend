import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: 'Category display name' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Short prefix used for item codes (e.g., SECT, CHAN)',
  })
  prefix?: string;
}
