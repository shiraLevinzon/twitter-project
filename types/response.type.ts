import UserDocument from "./user.type";
import TweetDocument from "./tweet.type";
import { Types } from "mongoose";

type response = {
    status: number;
    body:  UserDocument | TweetDocument ;
  };

  export default response;
  