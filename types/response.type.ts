import UserDocument from "./user.type";
import TweetDocument from "./tweet.type";

type response = {
    status: number;
    body: UserDocument | TweetDocument| object;
  };

  export default response;
  