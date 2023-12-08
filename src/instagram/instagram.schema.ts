import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Instagram {
  id: mongoose.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  comment: string;

  @Prop()
  desc: string;

  @Prop()
  author: string;
}

export const InstagramSchema = SchemaFactory.createForClass(Instagram);
