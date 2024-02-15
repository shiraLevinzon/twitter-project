import Tweet from "../db/Tweet.model";
import TweetDocument, {TweetPopulated} from "../../../types/tweet.type";

export const getAllTweets = async (query: Object): Promise<Array<TweetPopulated>> => await Tweet.aggregate([
  { $match: query },
  { $lookup: { from: 'tweets', localField: 'comments', foreignField: '_id', as: 'comments' } },
  { $lookup: { from: 'users', localField: 'tweetOwner', foreignField: '_id', as: 'tweetOwner' } }
])

export const getTweetById = async (id: string): Promise<TweetPopulated> => await Tweet.findOne({ _id: id }).populate("comments").populate("tweetOwner");
export const getTweetsByOwener = async (ownerId: string): Promise<Array<TweetPopulated>> => await Tweet.find({ tweetOwner: ownerId })
  .populate("comments").populate("tweetOwner");
export const getTweetsByLikes = async (page: number, pageSize: number, query: Object): Promise<Array<TweetPopulated>> => await Tweet.aggregate([
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
export const getTweetsByDate = async (page: number, pageSize: number, query: Object): Promise<Array<TweetPopulated>> => await await Tweet.aggregate([
  { $match: query },
  { $sort: { dateCreated: -1 } },
  { $lookup: { from: 'comments', localField: 'comments', foreignField: '_id', as: 'comments' } },
  { $lookup: { from: 'users', localField: 'tweetOwner', foreignField: '_id', as: 'tweetOwner' } },
  { $skip: (page - 1) * pageSize },
  { $limit: pageSize }
])

export const addTweet = async (body: TweetDocument, userId: string): Promise<TweetPopulated> => {
  const newTweet: TweetDocument = new Tweet({ ...body, tweetOwner: userId });
  await newTweet.save();
  return Tweet.findById(newTweet._id)
  .populate("comments")
  .populate("tweetOwner");
};
export const updateComments = async (tweetId: string, newComments: string): Promise<TweetPopulated> => {
  const update: TweetPopulated = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { comments: newComments } },
    { new: true }
  ).populate("comments").populate("tweetOwner");
  return update;
}
export const updateLikes = async (tweetId: string, newLikes: string): Promise<TweetPopulated> => {
  const update: TweetPopulated = await Tweet.findOneAndUpdate(
    { _id: tweetId },
    { $addToSet: { likes: newLikes } },
    { new: true }
  ).populate("comments").populate("tweetOwner");
  return update;
}
export const updateDislikes = async (tweetId: string, newLikes: string): Promise<TweetPopulated> => {
  const update: TweetPopulated = await Tweet.findOneAndUpdate(
    { _id: tweetId, likes: { $in: [newLikes] } },
    { $pull: { likes: newLikes } },
    { new: true }).populate("comments").populate("tweetOwner");
  return update;
}

export const deleteTweet = async (id: string): Promise<TweetDocument> => await Tweet.findOneAndDelete({ _id: id });


