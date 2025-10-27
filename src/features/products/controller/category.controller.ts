import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dtos/CreateCategory';
import { UpdateCategoryDto } from '../dtos/UpdateCategory';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    // ensure prefix is normalized server-side
    const prefix = String(data.name || 'CAT')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 8);

    const payload = {
      name: data.name,
      prefix,
      seq: 0,
    };

    return this.categoryService.create(payload as any);
  }

  @Get()
  async getAll() {
    console.log('test');
    return this.categoryService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    const payload: any = {};
    if (data.name) payload.name = data.name;
    if (data.prefix)
      payload.prefix = String(data.prefix)
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 8);

    return this.categoryService.update(id, payload);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
