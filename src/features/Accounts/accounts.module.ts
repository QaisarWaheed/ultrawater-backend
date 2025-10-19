import { Module } from '@nestjs/common';
import { JournalVoucher } from './journalVoucher/journalVoucher';
import { RecieptVoucher } from './recieptVoucher/recieptVoucher.module';

@Module({

imports:[JournalVoucher,RecieptVoucher]

})
export class AccountsModule {}
