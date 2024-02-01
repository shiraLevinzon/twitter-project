import { Request, Response } from "express";
import * as tweetRepository from './Tweet.repository'
import { getUserById } from '../User/User.manager'
import mongoose from "mongoose";
import map from 'lodash/map';
import TweetDocument from "../../../types/tweet.type";

export const addTweet = async (req: Request, userId: string) : Promise<{status: number, body: TweetDocument}>=> {
    const { body } = req;
    const updateUser = {
        ...body,
        tweetOwner: userId
    }
    const newTweet = await tweetRepository.addTweet(updateUser)

    return {
        status: 201,
        body: newTweet
    };
}
const deleteAll = async (id: string)  : Promise<void> => {
    const {comments, _id} = await tweetRepository.getTweetById(id)
    map(comments, (commentId: string) => {
        deleteAll(commentId)
    });
    await tweetRepository.deleteTweet(_id)
}

export const deleteTweet = async (req: Request, userId: string)  : Promise<{status: number, body: Object}> => {
    const  {id: tweetId}  = req.params;

    const {role : userRole } = (await getUserById(userId)).body;
    const {tweetOwner} = await tweetRepository.getTweetById(tweetId);
    const {role: ownerRole} = (await getUserById(tweetOwner.toString())).body;

    const deleteByUser = userRole === "user" && tweetOwner.toString() !== userId;
    const deleteByManager = userRole === 'manager' && ownerRole === 'manager';

    if (deleteByUser)
        throw new Error("user cant delete another user tweet");

    if (deleteByManager)
        throw new Error("manager cant delete another manager tweet");


    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await deleteAll(tweetId);
        await session.commitTransaction();
        session.endSession();
        return {
            status: 200,
            body: {message: 'the tweet delete sucssesfuly'}
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        return {
            status: 400,
            body: error.message
        };
    }
}
export const updateComments = async (req: Request, newTweetId: string) : Promise<{status: number, body: TweetDocument}> => {
    const {id: fatherTweet}  = req.params;
    const res = await tweetRepository.updateComments(fatherTweet, newTweetId);
    return {
        status: 200,
        body: res
    }

}
export const updateLikes = async (req: Request, userId: string) : Promise<{status: number, body: TweetDocument}> => {
    const {id: fatherTweet}  = req.params;
    const res = await tweetRepository.updateLikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const updateDislikes = async (req: Request, userId: string) : Promise<{status: number, body: TweetDocument}> => {
    const {id: fatherTweet}  = req.params;
    const res = await tweetRepository.updateDislikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const getAllTweets = async (req: Request) : Promise<{status: number, body: Array<TweetDocument>}> => {
    const {s: search} = req.query;
    let query = {};
    search ? query = { text: { $regex: search, $options: 'i' } } : query = {};

    const tweets = await tweetRepository.getAllTweets(query);
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetById = async (req: Request) : Promise<{status: number, body: TweetDocument}> => {
    const {id: tweetId} = req.params;
    const tweet = await tweetRepository.getTweetById(tweetId);
    return {
        status: 200,
        body: tweet
    }
}
export const getTweetsByDate = async (req: Request) : Promise<{status: number, body: Array<TweetDocument>}> => {
    const {date} = req.query;
    const tweets = await tweetRepository.getTweetsByDate(new Date(date.toString()));
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetsByLikes = async (req: Request) : Promise<{status: number, body: Array<TweetDocument>}> => {
    const {a: amountStr} = req.query;
    const amount = +amountStr;
    if (isNaN(amount)) throw new Error('Invalid amount');

    const tweets = await tweetRepository.getTweetsByLikes(amount);
    return {
        status: 200,
        body: tweets
    }

};
export const getTweetsByOwener = async (req: Request) : Promise<{status: number, body: Array<TweetDocument>}> => {
    const {owner} = req.query;
    const tweets = await tweetRepository.getTweetsByOwener(owner.toString());
    return {
        status: 200,
        body: tweets
    }

};



