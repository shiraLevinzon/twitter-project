import { Document, Types } from "mongoose";
import UserDocument from './user.type'
export type Tweet = {
  _id?: Types.ObjectId;
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: Types.ObjectId[];
  tweetOwner?: Types.ObjectId;
  likes: Types.ObjectId[];
};
export type TweetPopulated = {
  _id: Types.ObjectId;
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: TweetDocument[];
  tweetOwner?:  UserDocument;
  likes: Types.ObjectId[];
};
export enum SortOption {
  Date = "date",
  Likes = "likes",
  All="all"
}
type TweetDocument = Tweet & Document;

export default TweetDocument;