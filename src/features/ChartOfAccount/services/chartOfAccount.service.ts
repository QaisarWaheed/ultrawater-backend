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
    console.log('📥 UPDATE REQUEST ===');
    console.log('Account ID:', id);
    console.log('Modal Debit (what user entered):', updateOpeningBalanceDto.debit);
    console.log('Modal Credit (what user entered):', updateOpeningBalanceDto.credit);

    // Prepare the payload WITHOUT swapping
    const payload: Record<string, number> = {};

    // Only update fields that are provided
    if (updateOpeningBalanceDto.debit !== undefined && updateOpeningBalanceDto.debit !== null) {
      payload.debit = updateOpeningBalanceDto.debit;
    }
    if (updateOpeningBalanceDto.credit !== undefined && updateOpeningBalanceDto.credit !== null) {
      payload.credit = updateOpeningBalanceDto.credit;
    }

    console.log('🧾 Payload being sent to DB:', payload);

    const updated = await this.chartOfAccountModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    console.log('✅ REFETCH RESPONSE ===');
    console.log('Full response:', JSON.stringify(updated, null, 2));

    return updated;
  }


  async remove(id: string) {
    const deleted = await this.chartOfAccountModel.findByIdAndDelete(id).exec();
    return deleted;
  }
}
