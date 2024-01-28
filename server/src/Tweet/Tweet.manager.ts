import { Request, Response } from "express";
import {
    deleteTweet,
    getTweetByDate,
    getTweetById,
    getTweetByLikes,
    getTweetByOwener,
    getTweets,
    postTweet,
    updateComment
} from './Tweet.repository'
import { getUserById } from '../User/User.repository'
import tweetJoiScheme from "./Tweet.validator";


export const tweetPost = async (req: Request, userId: string) => {
    const { body } = req;
    const validate = tweetJoiScheme.validate(body);
    if (validate.error) throw new Error(validate.error.message);

    body.tweetOwner = userId;
    const newTweet = await postTweet(body)

    return {
        status: 201,
        body: newTweet
    };
}

export const tweetDelete = async (req: Request, userId: string) => {
    const { tweetId } = req.params;

    const user = await getUserById(userId);
    const tweet = await getTweetById(tweetId);
    if (user.role !== "manager" && tweet.tweetOwner.toString() !== userId)
        throw new Error("This user have no permission to delete this tweet");

    const deletedTweet = await deleteTweet(tweetId);
    return {
        status: 200,
        body: deletedTweet
    };


}
export const updateComments = async (req: Request, newTweetId: string) => {
    const { fatherTweet } = req.params;
    const res = await updateComment(fatherTweet, newTweetId);
    
}
export const updateLikes = async (req: Request, userId: string) => {


}
export const getTweetsByDate = async (req: Request) => {
    const date = req.query.date as string;
    const tweets = await getTweetByDate(new Date(date));
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetsByLikes = async (req: Request) => {
    const amountStr = req.query.amount as string;
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount)) throw new Error('Invalid amount');

    const tweets = await getTweetByLikes(amount);
    return {
        status: 200,
        body: tweets
    }

};
export const getTweetsByOwner = async (req: Request) => {
    const owner = req.query.owner as string;
    const tweets = await getTweetByOwener(owner);
    return {
        status: 200,
        body: tweets
    }

};


