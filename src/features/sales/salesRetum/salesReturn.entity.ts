import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/features/products/entities/Product.entity';
import { Customer } from '../customer/entities/customer.entity';

export type paymentMethodType = 'Cash' | 'Card' | 'Cheque' | 'Credit';

@Schema({ timestamps: true })

export class SalesReturn {

  declare _id: mongoose.Types.ObjectId;
  
      @Prop({required:true})
      invoiveNumber: number;
  
      @Prop({required:true})
      invoiveDate: Date;
  
  
      @Prop()
      paymentMethod: paymentMethodType
  
  
     @Prop({required:true})
     products: Product[]
     
     @Prop()
     customer:Customer
  
      @Prop({required:true})
      remarks: string;
  
  
      @Prop()
      subTotal:number
  
      @Prop()
      totalGrossAmmount:number
  
      @Prop()
      totalDiscount:number
  
      @Prop()
      totalNetAmmount:number
  
      declare createdAt: Date;
  
      declare updatedAt: Date;
}
const salesReturnSchema = SchemaFactory.createForClass(SalesReturn);

export default salesReturnSchema;
