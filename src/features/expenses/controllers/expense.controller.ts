import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from '../services/expense.service';
import { CreateExpensesDto } from '../expenses.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('/getAll')
  async getAllProducts() {
    return this.expenseService.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.expenseService.findById(id);
  }

  @Post()
  async createProduct(@Body() expense: CreateExpensesDto) {
    return this.expenseService.addProduct(expense);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() expense: CreateExpensesDto) {
    return this.expenseService.updateProduct(id, expense);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.expenseService.deleteProduct(id);
  }
}
