import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import TweetDocument, { TweetPopulated } from '../../../../types/tweet.type';

export type DialogProps = {
  kind: string;
  refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TweetPopulated[], Error>>
}
export type Input = {
  tweetText: string;
}

