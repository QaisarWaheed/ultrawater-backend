/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartOfAccount } from '../entities/chartOfAccount.entity';
import { CreateChartOfAccountDto } from '../dto/createChartOfAccount.dto';
import { UpdateChartOfAccountDto } from '../dto/updateChartOfAccount.dto';
import { UpdateOpeningBalanceDto } from '../dto/updateOpeningBalance.dto';

@Injectable()
export class ChartOfAccountService {
  async findByAccountType(accountType: string) {
    return this.chartOfAccountModel.find({ accountType }).exec();
  }
  async findSalesAccounts() {
    const salesAccounts = await this.chartOfAccountModel
      .find({ accountType: 'sales' })
      .exec();
    return salesAccounts.map((acc) => ({
      SaleAccount: acc.accountCode,
      SaleAccountTitle: acc.accountName,
      _id: acc._id,
    }));
  }
  constructor(
    @InjectModel(ChartOfAccount.name, 'ultrawater')
    private chartOfAccountModel: Model<ChartOfAccount>,
  ) { }

  async create(createChartOfAccountDto: CreateChartOfAccountDto) {
    const created = new this.chartOfAccountModel(createChartOfAccountDto);
    await created.save();
    return created;
  }

  async findAll() {
    return this.chartOfAccountModel.find().exec();
  }

  async findOne(id: string) {
    return this.chartOfAccountModel.findById(id).exec();
  }

  async update(id: string, updateChartOfAccountDto: UpdateChartOfAccountDto) {
    return this.chartOfAccountModel
      .findByIdAndUpdate(id, updateChartOfAccountDto, { new: true })
      .exec();
  }

  async updateOpeningBalance(id: string, updateOpeningBalanceDto: UpdateOpeningBalanceDto) {
    console.log('Incoming DTO:', updateOpeningBalanceDto);

    // Swap debit ↔ credit to correct reversal issue
    const swappedPayload: Record<string, number> = {};
    if (updateOpeningBalanceDto.debit !== undefined) {
      swappedPayload.credit = updateOpeningBalanceDto.debit || 0;
    }
    if (updateOpeningBalanceDto.credit !== undefined) {
      swappedPayload.debit = updateOpeningBalanceDto.credit || 0;
    }

    // Only keep defined values
    const payload = Object.fromEntries(
      Object.entries(swappedPayload).filter(([_, v]) => v !== undefined)
    );

    console.log('🧾 Final payload to save:', payload);

    const updated = await this.chartOfAccountModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    console.log('✅ Updated document:', updated);
    return updated;
  }


  async remove(id: string) {
    const deleted = await this.chartOfAccountModel.findByIdAndDelete(id).exec();
    return deleted;
  }
}
