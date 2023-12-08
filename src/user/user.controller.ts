import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { UserDto } from "src/auth/dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  async getuser() {
    return await this.userservice.get();
  }

  @Get(":id")
  async getbyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      return await this.userservice.getbyid(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updatedto: UserDto
  ) {
    try {
      return await this.userservice.updatbyid(userId, updatedto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const deleteuser = await this.userservice.deletebyid(userId);
      return { message: `User deleted with #${userId}` };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
