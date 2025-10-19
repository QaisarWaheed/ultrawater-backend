import { ApiProperty } from "@nestjs/swagger";
import type { paymentType } from "../entities/customer.entity";

export class CreateCustomerDto {

@ApiProperty()
name: string;

@ApiProperty()
phone: string;

@ApiProperty()
email: string;

@ApiProperty()
address: string;

@ApiProperty()
city: string;

@ApiProperty()
gstNumber: number;

@ApiProperty()
openingAmount: number;

@ApiProperty()
creditLimit: number;

@ApiProperty()
paymentType: paymentType;


}