import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import TweetDocument from '../../../../types/tweet.type';

export type DialogProps = {
  kind: string;
  refetch?: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TweetDocument[], Error>>
}
export type Input = {
  tweetText: string;
}

