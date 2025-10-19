import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SaleInvoiceService } from '../../services/sale-invoice/sale-invoice.service';
import { CreateSalesInvoiceDto } from '../../salesinvoice.dto';
import { CreatePurchaseInvoicDto } from 'src/features/purchase/PurchaseInvoice/dtos/CreatePurchaseInvoiceDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sale-invoice')
@Controller('sale-invoice')
export class SaleInvoiceController {


constructor(private readonly saleInvoiceService : SaleInvoiceService){}


@Get()
async findAll(){
    return await this.saleInvoiceService.findAll()
}

@Get('/:id')
async findById(@Param('id') id:string){
    return await this.saleInvoiceService.findById(id)
}

@Post()
async createInvoice(@Body() data:CreateSalesInvoiceDto){
    return await this.saleInvoiceService.createInvoice(data)
}

@Put('/:id')
async updateInvoice(@Param('id') id:string, @Body() data:CreateSalesInvoiceDto){
    return await this.saleInvoiceService.updateInvoice(id, data)
}

@Delete('/:id')
async deleteInvoice(@Param('id') id:string){
    return await this.saleInvoiceService.deleteInvoice(id)
}

}
