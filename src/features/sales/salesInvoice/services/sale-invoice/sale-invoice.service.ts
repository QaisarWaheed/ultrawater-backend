import { Injectable } from '@nestjs/common';
import { SalesInvoice } from '../../salesinvoice.entity';
import { Model } from 'mongoose';
import { CreateSalesInvoiceDto } from '../../salesinvoice.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SaleInvoiceService {


constructor(@InjectModel('SalesInvoice') private readonly saleInvoiceModel: Model<SalesInvoice>){}


async findAll():Promise<SalesInvoice[]>{
    return await this.saleInvoiceModel.find();
}

async findById(id:string):Promise<SalesInvoice | null>{

    return await this.saleInvoiceModel.findById(id)

}

async createInvoice(data:CreateSalesInvoiceDto):Promise<SalesInvoice>{
    return await this.saleInvoiceModel
.create(data)
}

async updateInvoice(id:string, data:CreateSalesInvoiceDto):Promise<SalesInvoice | null>
{
    return await this.saleInvoiceModel
.findByIdAndUpdate(id, data, {new:true})
}


async deleteInvoice(id:string){
    return await this.saleInvoiceModel
.findByIdAndDelete(id)
}






}
