import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Expense } from '../expenses.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateExpensesDto } from '../expenses.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<Expense>,
  ) { }

  async findAll(): Promise<Expense[]> {
    try {
      return await this.expenseModel.find().exec();
    } catch (error) {
      console.log(error)
      throw new Error('Error fetching products', error);
    }
  }

  async findById(id: string): Promise<Expense | null> {
    try {
      const expense = await this.expenseModel.findById(id).exec();
      if (!expense) {
        throw new HttpException('No Product Found Against this Id', 404);
      }
      return expense;
    } catch (error) {
      throw new Error('Error fetching product by ID');
    }
  }

  async addExpense(expense: CreateExpensesDto): Promise<Expense> {
    try {
      const newExpense = new this.expenseModel(expense);
      return await newExpense.save();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateExpense(
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

  async deleteExpense(id: string): Promise<Expense | null> {
    return await this.expenseModel.findByIdAndDelete(id).exec();
  }
}
