import TweetDocument from '../../../../types/tweet.type';

export type TweetProps= {
  tweet: TweetDocument;
  }

  export type TimeUnit=
  {unit: string; 
    value: number|undefined;}