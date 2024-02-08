import Tweet from "../db/Tweet.model";
import TweetDocument from "../../../types/tweet.type";

export const getAllTweets = async (query: Object): Promise<Array<TweetDocument>> => await Tweet.find(query)
  .populate("comments").populate("tweetOwner");

export const getTweetById = async (id: string): Promise<TweetDocument> => await Tweet.findOne({ _id: id });
export const getTweetsByOwener = async (ownerId: string): Promise<Array<TweetDocument>> => await Tweet.find({ tweetOwner: ownerId })
  .populate("comments");
export const getTweetsByLikes = async (page: number, pageSize: number, query: Object): Promise<Array<TweetDocument>> => await Tweet.aggregate([
  { $match: query },
  {
    $addFields: {
      likeCount: { $size: '$likes' }
    }
  },
  { $sort: { likeCount: -1 } },
  { $lookup: { from: 'tweets', localField: 'comments', foreignField: '_id', as: 'comments' } },
  { $lookup: { from: 'users', localField: 'tweetOwner', foreignField: '_id', as: 'tweetOwner' } },
  { $skip: (page - 1) * pageSize },
  { $limit: pageSize }
])
export const getTweetsByDate = async (page: number, pageSize: number, query: Object): Promise<Array<TweetDocument>> => await await Tweet.aggregate([
  { $match: query },
  { $sort: { dateCreated: -1 } },
  { $lookup: { from: 'comments', localField: 'comments', foreignField: '_id', as: 'comments' } },
  { $lookup: { from: 'users', localField: 'tweetOwner', foreignField: '_id', as: 'tweetOwner' } },
  { $skip: (page - 1) * pageSize },
  { $limit: pageSize }
])

export const addTweet = async (body: TweetDocument, userId: string): Promise<TweetDocument> => {
  const newTweet: TweetDocument = new Tweet({ ...body, tweetOwner: userId });
  await newTweet.save();
  return newTweet;
};
export const updateComments = async (tweetId: string, newComments: string): Promise<TweetDocument> => {
  const update: TweetDocument = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { comments: newComments } },
    { new: true }
  ).populate("comments").populate("tweetOwner");
  return update;
}
export const updateLikes = async (tweetId: string, newLikes: string): Promise<TweetDocument> => {
  const update: TweetDocument = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { likes: newLikes } },
    { new: true }
  ).populate("comments").populate("tweetOwner");
  return update;
}
export const updateDislikes = async (tweetId: string, newLikes: string): Promise<TweetDocument> => {
  const update: TweetDocument = await Tweet.findOneAndUpdate(
    { _id: tweetId, likes: { $in: [newLikes] } },
    { $pull: { likes: newLikes } },
    { new: true }).populate("comments").populate("tweetOwner");
  return update;
}

export const deleteTweet = async (id: string): Promise<TweetDocument> => await Tweet.findOneAndDelete({ _id: id });


