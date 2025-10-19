import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import expenseSchema from './expenses.entity';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseService } from './services/expense.service';

@Module({

imports:[MongooseModule.forFeature([{name:'Expense', schema: expenseSchema}])],
controllers:[ExpenseController],
providers:[ExpenseService]



})
export class ExpenseModule {}
