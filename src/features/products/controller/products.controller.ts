/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '../dtos/CreateProduct';
import mongoose from 'mongoose';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async getAllProducts() {
    const products = await this.productService.findAll();
    console.log("Fetched all products");
    return products;
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    return this.productService.addProduct(productData);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() productData: Partial<CreateProductDto>) {
    return this.productService.updateProduct(id, productData);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
export default ProductsController;
