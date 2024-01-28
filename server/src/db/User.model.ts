import { Schema, Document, model, Types } from "mongoose";

type User = {
  userName: string;
  email: string;
  password: string;
  dateCreated?: Date;
  image?: string;
  loction?:string;
  role: "manager" | "user";
  followers: Types.ObjectId[];
};

type UserDocument = User & Document;

const userSchema = new Schema<UserDocument>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  loction:{
    type: String,
  },
  image:{
    type: String,
  },
  role: {
    type: String,
    enum: ["manager", "user"],
    default: "user",
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  
});

const User = model<UserDocument>("User", userSchema);
export default User;