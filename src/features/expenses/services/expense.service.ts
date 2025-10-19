import { HttpException, Injectable } from '@nestjs/common';
import { Expense } from '../expenses.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpensesDto } from '../expenses.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<Expense>,
  ) {}

  async findAll(): Promise<Expense[]> {
    try {
      return await this.expenseModel.find().exec();
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async findById(id: string): Promise<Expense | null> {
    try {
      const product = await this.expenseModel.findById(id).exec();
      if (!product) {
        throw new HttpException('No Product Found Against this Id', 404);
      }
      return product;
    } catch (error) {
      throw new Error('Error fetching product by ID');
    }
  }

  async addProduct(expense: CreateExpensesDto): Promise<Expense> {
    try {
      const newProduct = await this.expenseModel.create(expense);
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(
    id: string,
    expense: Partial<CreateExpensesDto>,
  ): Promise<Expense | null> {
    try {
      return await this.expenseModel
        .findByIdAndUpdate(id, expense, { new: true })
        .exec();
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async deleteProduct(id: string): Promise<Expense | null> {
    return await this.expenseModel.findByIdAndDelete(id).exec();
  }
}
