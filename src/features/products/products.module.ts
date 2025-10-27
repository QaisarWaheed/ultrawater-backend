import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './entities/Product.entity';
import { categorySchema } from './entities/Category.entity';
import { ProductsController } from './controller/products.controller';
import { ProductService } from './services/product.service';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
    ]),
  ],
  providers: [ProductService, CategoryService],
  controllers: [ProductsController, CategoryController],
})
export class ProductsModule {}
