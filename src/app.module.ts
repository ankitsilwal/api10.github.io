import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
