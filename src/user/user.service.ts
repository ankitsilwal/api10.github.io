import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UserDto } from "src/auth/dto/user.dto";
import { User } from "src/auth/schema/schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private usermodel: Model<User>) {}

  async get(): Promise<User[]> {
    return await this.usermodel.find({},{password:0});
  }

  async getbyid(userId: mongoose.Types.ObjectId) {
    const get = await this.usermodel.findById(userId,{password:0});
    if (!get) {
      throw new NotFoundException(`User not found`);
    }
    return get;
  }

  async updatbyid(userId: mongoose.Types.ObjectId, updatedto: UserDto) {
    const updateuser = await this.usermodel.findByIdAndUpdate(
      userId,
      updatedto,
      { new: true }
    );
    if (!updateuser) {
      throw new NotFoundException(`User not found or Invalid Details`);
    }
    return updateuser;
  }

  async deletebyid(userId: mongoose.Types.ObjectId) {
    const deleteuser = await this.usermodel.findByIdAndDelete(userId);
    if (!deleteuser) {
      throw new NotFoundException(`User not Found`);
    }

    return deleteuser;
  }
}
