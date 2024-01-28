import Tweet from "../db/Tweet.model";

export const getTweets = async () => await Tweet.find();
export const getTweetById = async (id: string) => await Tweet.findOne({ _id: id });
export const getTweetByOwener = async (ownerId: string) => await Tweet.find({tweetOwner: ownerId})
.populate("comments");
export const getTweetByLikes = async (amount: number) => await Tweet.find()
.sort({ likes: -1 })
.limit(amount)
.populate("comments");
export const getTweetByDate = async (date: Date) => await Tweet.find({ dateCreated: { $gt: date } })
.populate("comments");
export const postTweet = async (body: Body) => {
  const newTweet = new Tweet(body);
  await newTweet.save();
  return newTweet;
};
export const updateComment = async (tweetId: string, newComments: string) => {
  const update = await Tweet.updateOne(
    { _id: tweetId },
    { $addToSet: { comments: newComments } }
  );
  return update;
}

export const deleteTweet = async (id:string) => await Tweet.deleteOne({ _id: id });
  