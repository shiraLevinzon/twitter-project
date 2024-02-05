import UserDocument from "./user.type";
import TweetDocument from "./tweet.type";

export type DocResponse = {
  status: number;
  body: TweetDocument | UserDocument |  string | Array<TweetDocument> | Array<UserDocument>;
};

export type LoginDocResponse = {
  status: number;
  body: { user: UserDocument, token: string } | string;
};

export type DocUserResponse = {
  status: number;
  body: UserDocument;
};

export type DocTweetResponse = {
  status: number;
  body: TweetDocument;
};

export type DocArrTweetResponse = {
  status: number;
  body: Array<TweetDocument> ;
};

export type DeleteResponse = {
  status: number;
  body: string;
};



