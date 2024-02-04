import { Document, Types } from "mongoose";
type Tweet = {
  _id?: Types.ObjectId;
  text: string;
  dateCreated?: Date;
  image?: string;
  comments: Types.ObjectId[] ;
  tweetOwner?: Types.ObjectId | string;
  likes: Types.ObjectId[];
};

type TweetDocument = Tweet & Document;

export default TweetDocument;