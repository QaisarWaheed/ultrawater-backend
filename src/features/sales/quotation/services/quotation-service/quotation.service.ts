/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Quotation } from '../../quotation.entity';
import { CreateQuotationDto } from '../../createQuotation.dto';

@Injectable()
export class QuotationService {


    constructor(@InjectModel('Quotation') private readonly saleInvoiceModel: Model<Quotation>) { }


    async findAll(): Promise<Quotation[]> {
        return await this.saleInvoiceModel.find();
    }

    async findById(id: string): Promise<Quotation | null> {

        return await this.saleInvoiceModel.findById(id)

    }

    async createInvoice(data: CreateQuotationDto): Promise<Quotation> {
        return await this.saleInvoiceModel
            .create(data)
    }

    async updateInvoice(id: string, data: CreateQuotationDto): Promise<Quotation | null> {
        return await this.saleInvoiceModel
            .findByIdAndUpdate(id, data, { new: true })
    }


    async deleteInvoice(id: string) {
        return await this.saleInvoiceModel
            .findByIdAndDelete(id)
    }






}
