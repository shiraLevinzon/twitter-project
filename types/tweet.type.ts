import { Document, Types } from "mongoose";
import UserDocument from './user.type'
type Tweet = {
  _id?: Types.ObjectId;
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: Types.ObjectId[] | TweetDocument[];
  tweetOwner?: Types.ObjectId | UserDocument;
  likes: Types.ObjectId[];
};

type TweetDocument = Tweet & Document;

export default TweetDocument;