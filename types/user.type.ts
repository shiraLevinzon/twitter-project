import { Document, Types } from "mongoose";

type User = {
  _id?:Types.ObjectId;
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

export default UserDocument;
