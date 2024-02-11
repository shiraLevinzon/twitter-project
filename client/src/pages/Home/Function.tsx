import TweetDocument from "../../../../types/tweet.type";
import UserDocument from "../../../../types/user.type";
import TweetItem from "../../components/TweetItem/Index";



export const renderTweet = (tweet: TweetDocument) => (

     <TweetItem key={tweet.id} tweet={tweet}/>
);

export const margeFilter = (tw: TweetDocument, user: UserDocument): boolean => {
     return Array.isArray(tw.tweetOwner) && tw.tweetOwner.length > 0 &&
          user.followers?.includes(tw.tweetOwner[0]._id) || false;
}
