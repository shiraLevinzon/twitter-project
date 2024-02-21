import { DateTime } from "ts-luxon";
import TweetDocument from "../../../../types/tweet.type";

import { NavigateFunction } from "react-router-dom";
import { find } from "lodash/fp";
import { TimeUnit } from "./Types";

export const goToTweetPage = async (navigate: NavigateFunction, tweetId: string): Promise<void> => {
  navigate(`/tweet/${tweetId}`);
}



export const getTimeElapsedString = (tweet: TweetDocument): string => {
  if (!tweet.dateCreated) {
    return "Invalid date";
  }

  const currentDate: DateTime = DateTime.local();
  const tweetDate: DateTime = DateTime.fromISO(tweet.dateCreated.toString());
  const diff = currentDate.diff(tweetDate, ['days', 'hours', 'minutes', 'seconds']).toObject();

  const timeUnits: Array<TimeUnit> = [
    { unit: 'day', value: diff.days },
    { unit: 'hour', value: diff.hours },
    { unit: 'minute', value: diff.minutes },
    { unit: 'second', value: diff.seconds },
  ];

  const currentUnit: TimeUnit | undefined = find<TimeUnit>(unit => unit.value !== undefined && unit.value > 0)(timeUnits);


  return currentUnit
    ? `posted ${currentUnit.value} ${currentUnit.unit}${currentUnit.value === 1 ? '' : 's'} ago`
    : 'just now';
}
