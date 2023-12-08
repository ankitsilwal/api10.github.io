import { IsEnum } from "class-validator";

export class UserRole {
  ADMIN = "admin";
  USER = "user";
}

export class UserDto {
  username: string;

  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  pnumber: number;
}
