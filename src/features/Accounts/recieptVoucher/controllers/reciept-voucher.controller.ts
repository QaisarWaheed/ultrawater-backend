import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecieptVoucherService } from '../services/reciept-voucher.service';
import { CreateRecipetVoucherDto } from '../createReciept.dto';

@Controller('reciept-voucher')
export class RecieptVoucherController {

constructor(private readonly recieptVoucher: RecieptVoucherService) {}


@Get('/getAll')
async getAllProducts() {
    return this.recieptVoucher.findAll();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.recieptVoucher.findById(id);
  }

@Post()  
    async createProduct(@Body() data: CreateRecipetVoucherDto) {
    return this.recieptVoucher.addProduct(data);
  }

  
  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.recieptVoucher.updateProduct(id, data);
  }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: string) {
    return this.recieptVoucher.deleteProduct(id);
  }


}
