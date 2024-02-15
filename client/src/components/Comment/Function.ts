import { NavigateFunction } from "react-router-dom";

export const goToTweetPage = async (navigate: NavigateFunction, tweetId: string): Promise<void> => {
    navigate(`/tweet/${tweetId}`);
  }


