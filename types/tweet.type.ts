import { Document, Types } from "mongoose";
type Tweet = {
    text: string;
    dateCreated?: Date;
    image?: string;
    comments: Types.ObjectId[];
    tweetOwner: Types.ObjectId;
    likes: Types.ObjectId[];
  };
  
  type TweetDocument =  Tweet  & Document;
  
export default TweetDocument;