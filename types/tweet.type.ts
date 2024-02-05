import { Document, Types } from "mongoose";
import UserDocument from "./user.type";
type Tweet = {
  _id?: Types.ObjectId;
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: Types.ObjectId[] ;
  tweetOwner?: Types.ObjectId | string | UserDocument;
    likes: Types.ObjectId[];
};

type TweetDocument = Tweet & Document;

export default TweetDocument;