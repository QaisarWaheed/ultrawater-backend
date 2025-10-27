import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category display name' })
  name: string;

  //   @ApiProperty({
  //     description: 'Short prefix used for item codes (e.g., SECT, CHAN)',
  //   })
  //   prefix: string;
}
