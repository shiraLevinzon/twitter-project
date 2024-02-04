import { Document, Types } from "mongoose";


export enum Role {
  manager= "manager",
  user="user"
}
type User = {
  _id?:Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  dateCreated?: Date;
  image?: string;
  loction?:string;
  role: Role;
  followers: Types.ObjectId[];
};

type UserDocument = User & Document;

export default UserDocument;
