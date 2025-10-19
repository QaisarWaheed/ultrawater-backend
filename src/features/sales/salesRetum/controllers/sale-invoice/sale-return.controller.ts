import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesReturnService } from '../../services/sale-invoice/sale-retrun.service';
import { CreateSalesReturnDto } from '../../salesReturn.dto';

@ApiTags('sale-Return')
@Controller('sale-return')
export class SalesReturnController {


constructor(private readonly salesReturnService : SalesReturnService){}


@Get()
async findAll(){
    return await this.salesReturnService.findAll()
}

@Get('/:id')
async findById(@Param('id') id:string){
    return await this.salesReturnService.findById(id)
}

@Post()
async createInvoice(@Body() data:CreateSalesReturnDto){
    return await this.salesReturnService.createInvoice(data)
}

@Put('/:id')
async updateInvoice(@Param('id') id:string, @Body() data:CreateSalesReturnDto){
    return await this.salesReturnService.updateInvoice(id, data)
}

@Delete('/:id')
async deleteInvoice(@Param('id') id:string){
    return await this.salesReturnService.deleteInvoice(id)
}

}
