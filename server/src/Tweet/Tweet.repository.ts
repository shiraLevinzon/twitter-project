import Tweet from "../db/Tweet.model";
import TweetDocument from "../../../types/tweet.type";

export const getAllTweets = async (query: Object): Promise<Array<TweetDocument>> => await Tweet.find(query).populate("comments").populate("tweetOwner");
export const getTweetById = async (id: string): Promise<TweetDocument> => await Tweet.findOne({ _id: id });
export const getTweetsByOwener = async (ownerId: string): Promise<Array<TweetDocument>> => await Tweet.find({ tweetOwner: ownerId })
  .populate("comments");
export const getTweetsByLikes = async (amount: number) : Promise<Array<TweetDocument>>  => await Tweet.find()
  .sort({ likes: -1 })
  .limit(amount)
  .populate("comments");
export const getTweetsByDate = async (date: Date): Promise<Array<TweetDocument>>  => await Tweet.find({ dateCreated: { $gt: date } })
  .populate("comments");

export const addTweet = async (body: TweetDocument, userId: string) : Promise<TweetDocument>  => {
  const newTweet : TweetDocument = new Tweet( {...body,tweetOwner: userId});
  await newTweet.save();
  return newTweet;
};
export const updateComments = async (tweetId: string, newComments: string)  : Promise<TweetDocument>=> {
  const update : TweetDocument = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { comments: newComments } },
    { new: true }
  );
  return update;
}
export const updateLikes = async (tweetId: string, newLikes: string) : Promise<TweetDocument>=> {
  const update : TweetDocument = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { likes: newLikes } },
    { new: true }
  );
  return update;
}
export const updateDislikes = async (tweetId: string, newLikes: string) : Promise<TweetDocument> => {
  const update : TweetDocument = await Tweet.findOneAndUpdate({ _id: tweetId, likes: { $in: [newLikes] } }, { $pull: { likes: newLikes } }, { new: true })
  return update;
}

export const deleteTweet = async (id: string) :  Promise<TweetDocument> => await Tweet.findOneAndDelete({ _id: id });


