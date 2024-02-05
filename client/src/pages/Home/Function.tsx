import TweetDocument from "../../../../types/tweet.type";
import  Tweet from "../../components/Tweet/Index";



export const renderTweet = (tweet: TweetDocument) => (
       <Tweet key={tweet.id} tweet={tweet} />
    
   
  );