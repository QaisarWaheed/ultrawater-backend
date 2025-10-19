import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseorderService } from '../services/purchaseorder.service';
import { CreatePurchaseInvoicDto } from '../../PurchaseInvoice/dtos/CreatePurchaseInvoiceDto.dto';
import { CreatePurchaseOrderDto } from '../dtos/CreatePurchaseOrder.dto';

@Controller('purchaseorder')
export class PurchaseorderController {



constructor(private readonly purchaseOrderService : PurchaseorderService){}


@Get()
async findAll(){
    return await this.purchaseOrderService.findAll()
}

@Get('/:id')
async findById(@Param('id') id:string){
    return await this.purchaseOrderService.findById(id)
}

@Post()
async createInvoice(@Body() data:CreatePurchaseOrderDto){
    return await this.purchaseOrderService.createInvoice(data)
}

@Put('/:id')
async updateInvoice(@Param('id') id:string, @Body() data:CreatePurchaseOrderDto){
    return await this.purchaseOrderService.updateInvoice(id, data)
}

@Delete('/:id')
async deleteInvoice(@Param('id') id:string){
    return await this.purchaseOrderService.deleteInvoice(id)
}






}
