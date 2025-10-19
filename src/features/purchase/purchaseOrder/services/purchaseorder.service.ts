import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePurchaseOrderDto } from '../dtos/CreatePurchaseOrder.dto';
import { PurchaseOrder } from '../entity/purchaseOrder.entity';

@Injectable()
export class PurchaseorderService {
  constructor(
    @InjectModel('PurchaseInvoice')
    private readonly purchaseOrderModel: Model<PurchaseOrder>,
  ) {}

  async findAll(): Promise<PurchaseOrder[]> {
    return await this.purchaseOrderModel.find();
  }

  async findById(id: string): Promise<PurchaseOrder | null> {
    return await this.purchaseOrderModel.findById(id);
  }

  async createInvoice(data: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    return await this.purchaseOrderModel.create(data);
  }

  async updateInvoice(
    id: string,
    data: CreatePurchaseOrderDto,
  ): Promise<PurchaseOrder | null> {
    return await this.purchaseOrderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async deleteInvoice(id: string) {
    return await this.purchaseOrderModel.findByIdAndDelete(id);
  }
}
