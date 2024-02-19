import UserDocument from "./user.type";
import TweetDocument, { TweetPopulated } from "./tweet.type";

export type DocResponse = {
  status: number;
  body: TweetDocument | UserDocument |  string | Array<TweetDocument> | Array<UserDocument> |TweetPopulated | Array<TweetPopulated>;
};

export type LoginDocResponse = {
  status: number;
  body: LoginUser | string;
};

export type DocUserResponse = {
  status: number;
  body: UserDocument;
};

export type DocTweetResponse = {
  status: number;
  body: TweetDocument | TweetPopulated;
};

export type DocArrTweetResponse = {
  status: number;
  body: Array<TweetDocument> | Array<TweetPopulated>;
};

export type DeleteResponse = {
  status: number;
  body: string;
};


export type LoginUser={
  user: UserDocument;
   token: string;
}
