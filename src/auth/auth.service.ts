import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtservice: JwtService
  ) {}

  async createuser(userdto: UserDto) {
    const { username, password, role, pnumber } = userdto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const usercreation = await this.authModel.create({
      username,
      password: hashedpassword,
      role,
      pnumber,
    });
    if (!usercreation) {
      throw new BadRequestException(`Invalid Details`);
    }
    return usercreation;
  }

  async findbyusername(username: string) {
    return await this.authModel.findOne({ username });
  }

  async login(username: string, password: string) {
    const usersign = await this.findbyusername(username);
    if (!usersign) {
      throw new UnauthorizedException(`User not Found`);
    }

    const validpassword = await bcrypt.compare(password, usersign.password);
    if (!validpassword) {
      throw new UnauthorizedException(`Password does not matched`);
    }

    const payload = {
      sub: usersign.id,
      role: usersign.role,
    };

    const accesstoken = this.jwtservice.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });

    return { accesstoken };
  }
}
