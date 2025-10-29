import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalVoucher } from '../../entities/journal-voucher/journal-voucher';
import { CreateJournalVoucherDto } from '../../dtos/create-journal-voucher/create-journal-voucher.dto';

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
export class JournalvoucherService {
  constructor(
    @InjectModel(JournalVoucher.name, 'ultrawater') private journalVoucherModel: Model<JournalVoucher>,
  ) { }

  async create(createJournalVoucherDto: CreateJournalVoucherDto | CreateJournalVoucherDto[]) {
    if (Array.isArray(createJournalVoucherDto)) {
      return await this.journalVoucherModel.insertMany(createJournalVoucherDto);
    } else {
      const created = new this.journalVoucherModel(createJournalVoucherDto);
      return await created.save();
    }
  }

  async findAll(filters?: {
    startDate?: string;
    endDate?: string;
  }) {
    let query: any = {};

    if (filters?.startDate || filters?.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = parseMMDDYYYY(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = parseMMDDYYYY(filters.endDate);
      }
    }

    return await this.journalVoucherModel.find(query).exec();
  }

  async findOne(id: string): Promise<JournalVoucher | null> {
    return this.journalVoucherModel.findById(id).exec();
  }

  async findByVoucherNumber(voucherNumber: string): Promise<JournalVoucher[]> {
    return this.journalVoucherModel.find({ voucherNumber }).exec();
  }

  async update(id: string, updateJournalVoucherDto: CreateJournalVoucherDto): Promise<JournalVoucher | null> {
    return this.journalVoucherModel.findByIdAndUpdate(id, updateJournalVoucherDto, { new: true }).exec();
  }

  async remove(id: string): Promise<JournalVoucher | null> {
    return this.journalVoucherModel.findByIdAndDelete(id).exec();
  }

  async getJournalVouchersByDateRange(
    startDate?: string,
    endDate?: string,
  ): Promise<JournalVoucher[]> {
    const start = startDate ? parseMMDDYYYY(startDate) : undefined;
    const end = endDate ? parseMMDDYYYY(endDate) : undefined;

    const query: any = {};
    if (start || end) {
      query.date = {};
      if (start) query.date.$gte = start;
      if (end) query.date.$lte = end;
    }

    return this.journalVoucherModel.find(query).exec();
  }

  async getJournalVoucherSummary(
    startDate?: string,
    endDate?: string,
  ): Promise<{
    totalDebit: number;
    totalCredit: number;
    transactions: JournalVoucher[];
  }> {
    const transactions = await this.getJournalVouchersByDateRange(startDate, endDate);

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.debit) {
          acc.totalDebit += transaction.debit;
        }
        if (transaction.credit) {
          acc.totalCredit += transaction.credit;
        }
        return acc;
      },
      { totalDebit: 0, totalCredit: 0 },
    );

    return {
      ...summary,
      transactions,
    };
  }



}
