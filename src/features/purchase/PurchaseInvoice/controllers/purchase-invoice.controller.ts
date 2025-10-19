import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseInvoiceService } from '../services/purchase-invoice.service';
import { CreatePurchaseInvoicDto } from '../dtos/CreatePurchaseInvoiceDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('purchase-invoice')
@Controller('purchase-invoice')
export class PurchaseInvoiceController {

constructor(private readonly purchaseInvoiceService : PurchaseInvoiceService){}


@Get()
async findAll(){
    return await this.purchaseInvoiceService.findAll()
}

@Get('/:id')
async findById(@Param('id') id:string){
    return await this.purchaseInvoiceService.findById(id)
}

@Post()
async createInvoice(@Body() data:CreatePurchaseInvoicDto){
    return await this.purchaseInvoiceService.createInvoice(data)
}

@Put('/:id')
async updateInvoice(@Param('id') id:string, @Body() data:CreatePurchaseInvoicDto){
    return await this.purchaseInvoiceService.updateInvoice(id, data)
}

@Delete('/:id')
async deleteInvoice(@Param('id') id:string){
    return await this.purchaseInvoiceService.deleteInvoice(id)
}


}
