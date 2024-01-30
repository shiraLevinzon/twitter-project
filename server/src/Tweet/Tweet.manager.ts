import { Request, Response } from "express";
import * as tweetRepository from './Tweet.repository'
import { getUserById } from '../User/User.manager'
import mongoose from "mongoose";
const _ = require('lodash');
import response from '../../../types/response.type';



export const addTweet = async (req: Request, userId: string) => {
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
const deleteAll = async (id: string) => {
    const tweet = await tweetRepository.getTweetById(id)

    _.forEach(tweet.comments, (commentId: string) => {
        deleteAll(commentId);
    });

    await tweetRepository.deleteTweet(tweet._id)
}

export const deleteTweet = async (req: Request, userId: string) => {
    const  tweetId  = req.params.id;

    const user = await getUserById(userId);
    const tweet = await tweetRepository.getTweetById(tweetId);
    const owner = await getUserById(tweet.tweetOwner.toString())

    const deleteByUser = user.body.role === "user" && tweet.tweetOwner.toString() !== userId;
    const deleteByManager = user.body.role === 'manager' && owner.body.role === 'manager';

    if (deleteByUser)
        throw new Error("user cant delete another user tweet");

    if (deleteByManager)
        throw new Error("manager cant delete another manager tweet");


    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedTweet = await deleteAll(tweetId);
        await session.commitTransaction();
        session.endSession();
        return {
            status: 200,
            body: deletedTweet
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
export const updateComments = async (req: Request, newTweetId: string) => {
    const fatherTweet  = req.params.id;
    const res = await tweetRepository.updateComments(fatherTweet, newTweetId);
    return {
        status: 200,
        body: res
    }

}
export const updateLikes = async (req: Request, userId: string) => {
    const fatherTweet = req.params.id;
    const res = await tweetRepository.updateLikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const updateDislikes = async (req: Request, userId: string) => {
    const fatherTweet = req.params.id;
    const res = await tweetRepository.updateDislikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const getAllTweets = async (req: Request) => {
    const search = req.query.s
    let query = {};
    search ? query = { text: { $regex: search, $options: 'i' } } : query = {};

    const tweets = await tweetRepository.getAllTweets(query);
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetById = async (req: Request,) => {
    const tweetId = req.params.id;
    const tweet = await tweetRepository.getTweetById(tweetId);
    return {
        status: 200,
        body: tweet
    }
}
export const getTweetsByDate = async (req: Request) => {
    const date = req.query.date;
    const tweets = await tweetRepository.getTweetsByDate(new Date(date.toString()));
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetsByLikes = async (req: Request) => {
    const amountStr = req.query.amount;
    const amount = +amountStr;
    if (isNaN(amount)) throw new Error('Invalid amount');

    const tweets = await tweetRepository.getTweetsByLikes(amount);
    return {
        status: 200,
        body: tweets
    }

};
export const getTweetsByOwener = async (req: Request) => {
    const owner = req.query.owner;
    const tweets = await tweetRepository.getTweetsByOwener(owner.toString());
    return {
        status: 200,
        body: tweets
    }

};



