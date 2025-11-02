/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PurchaseReturn } from '../entities/PurchaseReturn.entity';
import { Model } from 'mongoose';
import { CreatePurchaseReturnDto } from '../dtos/CreatePurchaseReturn.dto';

@Injectable()
export class PurchaseReturnService {



    constructor(@InjectModel('PurchaseReturn') private readonly purchaseReturnModel: Model<PurchaseReturn>) { }


    async findAll(): Promise<PurchaseReturn[]> {
        return await this.purchaseReturnModel.find();
    }

    async findById(id: string): Promise<PurchaseReturn | null> {

        return await this.purchaseReturnModel.findById(id)

    }

    async createInvoice(data: CreatePurchaseReturnDto): Promise<PurchaseReturn> {
        return await this.purchaseReturnModel.create(data)
    }

    async updateInvoice(returnNumber: string, data: CreatePurchaseReturnDto): Promise<PurchaseReturn | null> {
        return await this.purchaseReturnModel.findOneAndUpdate({ returnNumber }, data, { new: true })
    }


    async deleteInvoice(returnNumber: string) {
        return await this.purchaseReturnModel.findOneAndDelete({ returnNumber })
    }




}
