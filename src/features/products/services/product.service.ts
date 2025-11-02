/* eslint-disable prettier/prettier */
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProduct';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      console.log('Products from DB:', products);
      return products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async findById(_id: string): Promise<Product | null> {
    try {
      const product = await this.productModel.findById(_id).exec();
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

      const newProduct = await this.productModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product: ' + (error?.message || error));
    }
  }

  async updateProduct(
    _id: string,
    product: Partial<CreateProductDto>,
  ): Promise<Product | null> {
    try {
      return await this.productModel
        .findByIdAndUpdate(_id, product, { new: true })
        .exec();

    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async deleteProduct(_id: string): Promise<Product | null> {
    return await this.productModel.findByIdAndDelete(_id).exec();
  }
}
