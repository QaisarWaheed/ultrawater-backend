import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SalesReturn } from '../../salesReturn.entity';
import { CreateSalesReturnDto } from '../../salesReturn.dto';

@Injectable()
export class SalesReturnService {
  constructor(
    @InjectModel('SalesReturn')
    private readonly salesReturnModel: Model<SalesReturn>,
  ) {}

  async findAll(): Promise<SalesReturn[]> {
    return await this.salesReturnModel.find();
  }

  async findById(id: string): Promise<SalesReturn | null> {
    return await this.salesReturnModel.findById(id);
  }

  async createInvoice(data: CreateSalesReturnDto): Promise<SalesReturn> {
    return await this.salesReturnModel.create(data);
  }

  async updateInvoice(
    id: string,
    data: CreateSalesReturnDto,
  ): Promise<SalesReturn | null> {
    return await this.salesReturnModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteInvoice(id: string) {
    return await this.salesReturnModel.findByIdAndDelete(id);
  }
}
