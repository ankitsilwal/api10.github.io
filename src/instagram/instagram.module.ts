import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Instagram, InstagramSchema } from "./instagram.schema";
import { InstagramController } from "./instagram.controller";
import { InstagramService } from "./instagram.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instagram.name, schema: InstagramSchema },
    ]),
  ],
  controllers: [InstagramController],
  providers: [InstagramService, AuthGuard,JwtService],
})
export class InstagramModule {}
