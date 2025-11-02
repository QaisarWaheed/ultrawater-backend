/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { SalesInvoice } from '../../salesinvoice.entity';
import { Model } from 'mongoose';
import { CreateSalesInvoiceDto } from '../../salesinvoice.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SaleInvoiceService {


    constructor(@InjectModel('SalesInvoice') private readonly saleInvoiceModel: Model<SalesInvoice>) { }


    async findAll(): Promise<SalesInvoice[]> {
        return await this.saleInvoiceModel.find();
    }

    async findByInvoiceNumber(invoiceNumber: string): Promise<SalesInvoice | null> {
        return await this.saleInvoiceModel.findOne({ invoiceNumber }).exec();
    }

    async createInvoice(data: CreateSalesInvoiceDto): Promise<SalesInvoice> {
        return await this.saleInvoiceModel
            .create(data)
    }

    async updateInvoice(invoiceNumber: string, data: CreateSalesInvoiceDto): Promise<SalesInvoice | null> {
        try {
            const updatedInvoice = await this.saleInvoiceModel
                .findOneAndUpdate({ invoiceNumber }, data, { new: true })
            if (!updatedInvoice) {
                throw new NotFoundException('Invoice not found');
            }
            return updatedInvoice;

        } catch (error) {
            console.error('Error updating invoice:', error);
            throw new Error('Could not update invoice');
        }

    }
    async deleteInvoice(invoiceNumber: string) {
        return await this.saleInvoiceModel
            .findOneAndDelete({ invoiceNumber }).exec();
    }






}
