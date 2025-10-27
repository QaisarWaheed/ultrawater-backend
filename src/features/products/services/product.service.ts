import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProduct';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import type { Category as CategoryDoc } from '../entities/Category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDoc>,
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.find().exec();
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new HttpException('No Product Found Against this Id', 404);
      }
      return product;
    } catch (error) {
      throw new Error('Error fetching product by ID');
    }
  }

  async addProduct(product: CreateProductDto): Promise<Product> {
    try {
      // Validate category and atomically increment sequence for itemCode
      const categoryId = product.category;
      if (!categoryId) throw new HttpException('Category is required', 400);

      const category = await this.categoryModel
        .findByIdAndUpdate(categoryId, { $inc: { seq: 1 } }, { new: true })
        .exec();

      if (!category) throw new HttpException('Category not found', 404);

      // determine prefix: use stored prefix or derived from name
      const rawPrefix =
        (category as any).prefix || (category as any).name || 'CAT';
      const prefix =
        String(rawPrefix)
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, '')
          .slice(0, 8) || 'CAT';
      const seq = (category as any).seq || 0;
      const padded = String(seq).padStart(4, '0');
      const itemCode = `${prefix}-${padded}`;

      const payload = { ...product, itemCode } as any;
      const newProduct = await this.productModel.create(payload);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product: ' + (error?.message || error));
    }
  }

  async updateProduct(
    id: string,
    product: Partial<CreateProductDto>,
  ): Promise<Product | null> {
    try {
      return await this.productModel
        .findByIdAndUpdate(id, product, { new: true })
        .exec();
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async deleteProduct(id: string): Promise<Product | null> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
