import { Body, Controller, HttpException, Post, UseGuards } from "@nestjs/common";
import { InstagramService } from "./instagram.service";
import { InstaDto } from "./dto/insta.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";


@UseGuards(AuthGuard)
@Controller("instagram")
export class InstagramController {
  constructor(private instaservice: InstagramService) {}

  @Post("post")
  async create(@Body() instadto:InstaDto) {
    try {
      return await this.instaservice.post(instadto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }
}  