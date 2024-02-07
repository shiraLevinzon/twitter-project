import TweetDocument from "../../../../types/tweet.type";

export const getTimeElapsedString = (tweet: TweetDocument) => {

    if (!tweet.dateCreated)  return "Invalid date";
    
    const currentDate: Date = new Date();
    const timeDifference : number = currentDate.getTime() - new Date(tweet.dateCreated).getTime();
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);

    if (days > 0) return `posted ${days} day${days === 1 ? '' : 's'} ago`;
    else if (hours > 0) return `posted ${hours} hour${hours === 1 ? '' : 's'} ago`;
    else if (minutes > 0) return `posted ${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    else return `posted ${seconds} second${seconds === 1 ? '' : 's'} ago`;

}