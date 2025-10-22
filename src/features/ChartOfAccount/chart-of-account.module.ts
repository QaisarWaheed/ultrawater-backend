import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartOfAccountSchema } from './entities/chartOfAccount.entity';
import { ChartOfAccountController } from './controllers/chartOfAccount.controller';
import { ChartOfAccountService } from './services/chartOfAccount.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ChartOfAccount', schema: ChartOfAccountSchema },
    ], 'ultrawater'),
  ],
  controllers: [ChartOfAccountController],
  providers: [ChartOfAccountService],
})
export class ChartOfAccountModule {}
