import UserDocument from "./user.type";
import TweetDocument from "./tweet.type";
import { Types } from "mongoose";

type response = {
    status: number;
    body: {_id?: Types.ObjectId;} | UserDocument | TweetDocument | object;
  };

  export default response;
  