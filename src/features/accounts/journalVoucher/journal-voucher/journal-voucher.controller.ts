/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param, Delete, Put } from '@nestjs/common';
import { JournalvoucherService } from '../services/journalvoucher/journalvoucher.service';
import { CreateJournalVoucherDto } from '../dtos/create-journal-voucher/create-journal-voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('Journal Voucher')
@Controller('journal-vouchers')
export class JournalVoucherController {
  constructor(private readonly journalVoucherService: JournalvoucherService) { }

  @Post()
  @ApiBody({ type: CreateJournalVoucherDto, isArray: true })
  async create(
    @Body() dto: CreateJournalVoucherDto[] | CreateJournalVoucherDto,
  ) {
    console.log('Incoming Journal Voucher payload:', JSON.stringify(dto));

    const normalizeEntry = (entry: any) => {
      const normalized: any = { ...entry };
      if (normalized.credit === '' || normalized.credit === null) {
        delete normalized.credit;
      } else if (typeof normalized.credit === 'string') {
        const n = Number(normalized.credit);
        normalized.credit = Number.isNaN(n) ? undefined : n;
      }

      if (normalized.debit === '' || normalized.debit === null) {
        delete normalized.debit;
      } else if (typeof normalized.debit === 'string') {
        const n = Number(normalized.debit);
        normalized.debit = Number.isNaN(n) ? undefined : n;
      }

      if (normalized.date && typeof normalized.date === 'string') {
        const parsed = new Date(normalized.date);
        if (!Number.isNaN(parsed.getTime())) normalized.date = parsed;
      }

      return normalized;
    };

    let payload: any = dto;
    if (Array.isArray(dto)) {
      payload = dto.map((d) => normalizeEntry(d));
    } else {
      payload = normalizeEntry(dto as any);
    }

    console.log('Normalized Journal Voucher payload:', JSON.stringify(payload));

    const saved = await this.journalVoucherService.create(payload as any);

    console.log('Saved Journal Voucher result:', JSON.stringify(saved));

    return saved;
  }

  @Get()
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filters: any = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    return await this.journalVoucherService.findAll(
      Object.keys(filters).length ? filters : undefined,
    );
  }

  @Get(':voucherNumber')
  async findByVoucherNumber(@Param('voucherNumber') voucherNumber: string) {
    return await this.journalVoucherService.findByVoucherNumber(voucherNumber);
  }


  @Put(':voucherNumber')
  async update(
    @Param('voucherNumber') voucherNumber: string,
    @Body() updateJournalVoucherDto: CreateJournalVoucherDto,
  ) {
    return await this.journalVoucherService.update(voucherNumber, updateJournalVoucherDto);
  }

  @Delete(':voucherNumber')
  async remove(@Param('voucherNumber') voucherNumber: string) {
    return await this.journalVoucherService.remove(voucherNumber);
  }
}
