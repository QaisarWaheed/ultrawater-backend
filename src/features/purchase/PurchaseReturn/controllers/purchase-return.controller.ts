import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
 
import { PurchaseReturnService } from '../services/purchase-return.service';
import { CreatePurchaseReturnDto } from '../dtos/CreatePurchaseReturn.dto';

@Controller('purchase-return')
export class PurchaseReturnController {


    
    constructor(private readonly purchaseReturnSchema : PurchaseReturnService){}
    
    
    @Get()
    async findAll(){
        return await this.purchaseReturnSchema.findAll()
    }
    
    @Get('/:id')
    async findById(@Param('id') id:string){
        return await this.purchaseReturnSchema.findById(id)
    }
    
    @Post()
    async createInvoice(@Body() data:CreatePurchaseReturnDto){
        return await this.purchaseReturnSchema.createInvoice(data)
    }
    
    @Put('/:id')
    async updateInvoice(@Param('id') id:string, @Body() data:CreatePurchaseReturnDto){
        return await this.purchaseReturnSchema.updateInvoice(id, data)
    }
    
    @Delete('/:id')
    async deleteInvoice(@Param('id') id:string){
        return await this.deleteInvoice(id)
    }
    
}
