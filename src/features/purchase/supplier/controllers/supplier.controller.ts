import { CreateSupplierDto } from '../supplier.dto';
import { SupplierService } from './../services/supplier.service';
import { Body, Controller, Delete, Get,  Param, Post, Put } from '@nestjs/common';

@Controller('supplier')
export class SupplierController {


    constructor(private readonly supplierService: SupplierService){}

    @Get()
    async findAll(){
        return await this.supplierService.findAll()
    }

    @Get('/:id')
    async findById(@Param('id') id:string){
     
        return await this.supplierService.findById(id)
    }

  @Post()
    async newSupplier(@Body() data:CreateSupplierDto){
        return await this.supplierService.create(data)
    }

   

    @Put('updateSupplier/:id')
    async updateSupplier(@Param('id') id:string, @Body() data:Partial<CreateSupplierDto>){
       return await this.supplierService.updateSupplier(id, data)
    }


    @Delete('/:id')
    async deleteSupplier(@Param('id') id:string){
        return await this.supplierService.deleteSupplier(id)
    }



}
