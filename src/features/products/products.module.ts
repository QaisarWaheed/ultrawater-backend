import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './entities/Product.entity';
import { ProductsController } from './controller/products.controller';
import { ProductService } from './services/product.service';

@Module({
imports: [MongooseModule.forFeature([{ name: 'Product', schema: productSchema }])],
providers: [ProductService],
controllers: [ProductsController],


})
export class ProductsModule {}
