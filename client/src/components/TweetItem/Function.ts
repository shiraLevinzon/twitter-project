import { DateTime } from "ts-luxon";
import TweetDocument from "../../../../types/tweet.type";




export const getTimeElapsedString = (tweet: TweetDocument): string => {

    if (!tweet.dateCreated) return "Invalid date";

    const currentDate: DateTime = DateTime.local();
    const tweetDate: DateTime = DateTime.fromISO(tweet.dateCreated.toString());
    const diff = currentDate.diff(tweetDate, ['days', 'hours', 'minutes', 'seconds']).toObject();

    return (
        diff.days && diff.days > 0 ? `posted ${diff.days} day${diff.days === 1 ? '' : 's'} ago` :
        diff.hours && diff.hours > 0 ? `posted ${diff.hours} hour${diff.hours === 1 ? '' : 's'} ago` :
        diff.minutes && diff.minutes > 0 ? `posted ${diff.minutes} minute${diff.minutes === 1 ? '' : 's'} ago` :
        `posted ${diff.seconds} second${diff.seconds === 1 ? '' : 's'} ago`
    );

 }