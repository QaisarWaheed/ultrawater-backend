import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dtos/create-user-dto';

@Injectable()
export class UserService {

constructor(@InjectModel('User') private userModel: Model<User>){}



async getAllUsers(): Promise<User[] | null> {
    
    return this.userModel.find().exec();
}


async getUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
}

async createUser(userData: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(userData);
    return newUser;
}


 async updateUser(userId: string, updateData: Partial<CreateUserDto>): Promise<CreateUserDto | null> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
}


async deleteUser(userId: string): Promise<CreateUserDto | null> {
    return this.userModel.findByIdAndDelete(userId).exec(); 

}
}