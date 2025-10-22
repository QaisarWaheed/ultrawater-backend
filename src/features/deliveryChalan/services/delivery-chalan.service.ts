import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryChalan } from '../entities/delivery-chalan.entity';
import {
  CreateDeliveryChalanDto,
  UpdateDeliveryChalanDto,
} from '../dto/delivery-chalan.dto';

@Injectable()
export class DeliveryChalanService {
  constructor(
    @InjectModel(DeliveryChalan.name, 'ultrawater')
    private deliveryChalanModel: Model<DeliveryChalan>,
  ) {}


  async create(dto: CreateDeliveryChalanDto): Promise<DeliveryChalan> {
    const chalan = this.deliveryChalanModel.create(dto);
    return chalan
  }

  async findAll(): Promise<DeliveryChalan[]> {
    return this.deliveryChalanModel.find();
  }

  async findOne(id: string): Promise<DeliveryChalan> {
    const chalan = await this.deliveryChalanModel.findById(id);
    if (!chalan) throw new NotFoundException('Delivery Chalan not found');
    return chalan;
  }

  async update(
    id: string,
    dto: UpdateDeliveryChalanDto,
  ) {
    const updatedChalan = await this.deliveryChalanModel.findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return updatedChalan;
  }

  async remove(id: string): Promise<void> {
    const result = await this.deliveryChalanModel.deleteOne({ _id: id });
    if (!result.acknowledged)
      throw new NotFoundException('Delivery Chalan not found');
  }
}
