import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Instagram } from "./instagram.schema";
import { InstaDto } from "./dto/insta.dto";

@Injectable()
export class InstagramService {
  constructor(
    @InjectModel(Instagram.name) private instagramModel: Model<Instagram>
  ) {}

  async post(instadto: InstaDto) {
    const postcreation = await this.instagramModel.create(instadto);
    if (!postcreation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return postcreation;
  }
}
