import { Injectable } from '@nestjs/common';
import { PurchaseInvoice } from '../entities/PurchaseInvoice.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePurchaseInvoicDto } from '../dtos/CreatePurchaseInvoiceDto.dto';

@Injectable()
export class PurchaseInvoiceService {

constructor(@InjectModel('PurchaseInvoice') private readonly purchaseInvoiceModel: Model<PurchaseInvoice>){}


async findAll():Promise<PurchaseInvoice[]>{
    return await this.purchaseInvoiceModel.find();
}

async findById(id:string):Promise<PurchaseInvoice | null>{

    return await this.purchaseInvoiceModel.findById(id)

}

async createInvoice(data:CreatePurchaseInvoicDto):Promise<PurchaseInvoice>{
    return await this.purchaseInvoiceModel.create(data)
}

async updateInvoice(id:string, data:CreatePurchaseInvoicDto):Promise<PurchaseInvoice | null>
{
    return await this.purchaseInvoiceModel.findByIdAndUpdate(id, data, {new:true})
}


async deleteInvoice(id:string){
    return await this.purchaseInvoiceModel.findByIdAndDelete(id)
}


}
