import { Request, Response } from "express";
import {
    deleteTweet,
    getTweetByDate,
    getTweetById,
    getTweetByLikes,
    getTweetByOwener,
    getTweets,
    postTweet,
    updateComment,
    updateLike
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
    const owner = await getUserById(tweet.tweetOwner.toString())

    if (user.role === "user" && tweet.tweetOwner.toString() !== userId)
        throw new Error("user cant delete another user tweet");

    if (user.role === 'manager' && owner.role === 'manager')
        throw new Error("manager cant delete another manager tweet");


    const deletedTweet = await deleteTweet(tweetId);
    return {
        status: 200,
        body: deletedTweet
    };


}
export const updateComments = async (req: Request, newTweetId: string) => {
    const { fatherTweet } = req.params;
    const res = await updateComment(fatherTweet, newTweetId);
    return {
        status: 200,
        body: res
    }

}
export const updateLikes = async (req: Request, userId: string) => {
    const { fatherTweet } = req.params;
    const res = await updateLike(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const getAllTweets = async (req: Request) => {
    const search = req.query.s as string;
    let query = {};
    search ? query = { text: { $regex: search, $options: 'i' } } : query = {};

    const tweets = await getTweets(query);
    return {
        status: 200,
        body: tweets
    }
}
export const TweetById = async (req: Request,) => {
    const { tweetId } = req.params;
    const tweet = await getTweetById(tweetId);
    return {
        status: 200,
        body: tweet
    }
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



