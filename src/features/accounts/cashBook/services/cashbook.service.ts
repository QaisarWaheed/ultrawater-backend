import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cashbook, EntryType } from '../entities/cashbook.entity';
import { CreateCashbookDto } from '../dtos/CreateCashbook.dto';

function parseMMDDYYYY(dateStr?: string): Date | undefined {
  if (!dateStr) return undefined;
  const regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!regex.test(dateStr))
    throw new BadRequestException('Date must be in mm/dd/yyyy format');
  const [month, day, year] = dateStr.split('/');
  const paddedMonth = month.padStart(2, '0');
  const paddedDay = day.padStart(2, '0');
  return new Date(`${year}-${paddedMonth}-${paddedDay}`);
}

@Injectable()
export class CashbookService {
  constructor(
    @InjectModel(Cashbook.name, 'ultrawater') private cashbookModel: Model<Cashbook>,
  ) {}

  async create(createCashbookDto: CreateCashbookDto) {
    const created = new this.cashbookModel(createCashbookDto);
    return await created.save();
  }

  async getAllcashBookEntries() {
    return await this.cashbookModel.find().exec();
  }

  async getTotalAmount(amount: number) {
    if (isNaN(amount) || amount < 0) {
      throw new BadRequestException('Amount must be a positive number');
    }
    const result = await this.cashbookModel.findOne({ amount }).exec();
    if (!result) {
      throw new BadRequestException('Cashbook entry not found');
    }
    return result;
  }

  async findAll(filters?: {
    entryType?: EntryType;
    startDate?: string;
    endDate?: string;
  }) {
    let query: any = {};
    
    if (filters?.entryType) {
      query.entryType = filters.entryType;
    }

    if (filters?.startDate || filters?.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = parseMMDDYYYY(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = parseMMDDYYYY(filters.endDate);
      }
    }

    return await this.cashbookModel.find(query).exec();
  }

  async findOne(id: string): Promise<Cashbook | null> {
    return this.cashbookModel.findById(id).exec();
  }

  async update(id: string, updateCashbookDto: CreateCashbookDto): Promise<Cashbook | null> {
    return this.cashbookModel.findByIdAndUpdate(id, updateCashbookDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Cashbook | null> {
    return this.cashbookModel.findByIdAndDelete(id).exec();
  }

  async getCashbookByDateRange(
    startDate?: string,
    endDate?: string,
  ): Promise<Cashbook[]> {
    const start = startDate ? parseMMDDYYYY(startDate) : undefined;
    const end = endDate ? parseMMDDYYYY(endDate) : undefined;

    const query: any = {};
    if (start || end) {
      query.date = {};
      if (start) query.date.$gte = start;
      if (end) query.date.$lte = end;
    }

    return this.cashbookModel.find(query).exec();
  }

  async getCashbookSummary(
    startDate?: string,
    endDate?: string,
  ): Promise<{
    totalCashIn: number;
    totalCashOut: number;
    netCashFlow: number;
    transactions: Cashbook[];
  }> {
    const transactions = await this.getCashbookByDateRange(startDate, endDate);

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.entryType === 'cashReciept') {
          acc.totalCashIn += transaction.amount;
        } else if (transaction.entryType === 'cashPayment') {
          acc.totalCashOut += transaction.amount;
        }
        return acc;
      },
      { totalCashIn: 0, totalCashOut: 0 },
    );

    return {
      ...summary,
      netCashFlow: summary.totalCashIn - summary.totalCashOut,
      transactions,
    };
  }
}
