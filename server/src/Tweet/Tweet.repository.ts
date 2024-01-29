import Tweet from "../db/Tweet.model";


export const getAllTweets = async (query: Object) => await Tweet.find(query);
export const getTweetById = async (id: string) => await Tweet.findOne({ _id: id });
export const getTweetsByOwener = async (ownerId: string) => await Tweet.find({ tweetOwner: ownerId })
  .populate("comments");
export const getTweetsByLikes = async (amount: number) => await Tweet.find()
  .sort({ likes: -1 })
  .limit(amount)
  .populate("comments");
export const getTweetsByDate = async (date: Date) => await Tweet.find({ dateCreated: { $gt: date } })
  .populate("comments");
export const addTweet = async (body: Body) => {
  const newTweet = new Tweet(body);
  await newTweet.save();
  return newTweet;
};
export const updateComments = async (tweetId: string, newComments: string) => {
  const update = await Tweet.updateOne(
    { _id: tweetId },
    { $addToSet: { comments: newComments } }
  );
  return update;
}
export const updateLikes = async (tweetId: string, newLikes: string) => {
  const update = await Tweet.updateOne(
    { _id: tweetId },
    { $addToSet: { likes: newLikes } }
  );
  return update;
}
export const deleteTweet = async (id: string) => {
  await Tweet.deleteOne({ _id: id })
}

