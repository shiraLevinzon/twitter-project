import { Request } from "express";
import * as tweetRepository from './Tweet.repository'
import { getUserById } from '../User/User.manager'
import mongoose from "mongoose";
import map from 'lodash/fp/map';
import TweetDocument from "../../../types/tweet.type";
import { DocTweetResponse, DocArrTweetResponse, DeleteResponse } from '../../../types/response.type';
import { Role } from "../../../types/user.type";

export const addTweet = async (req: Request, userId: string): Promise<DocTweetResponse> => {
    const { body }: { body: TweetDocument } = req;
    const newTweet : TweetDocument = await tweetRepository.addTweet(body, userId);
    return {
        status: 201,
        body: newTweet
    };
}
const deleteComments = (commentId: string) => {
    deleteTweetsAndComments(commentId)
}
const deleteTweetsAndComments = async (id: string): Promise<void> => {
    const tweet: TweetDocument = await tweetRepository.getTweetById(id)

    map(deleteComments)(tweet.comments.toString());
    await tweetRepository.deleteTweet(tweet._id)
}


export const deleteTweet = async (req: Request, userId: string): Promise<DeleteResponse> => {
    const { id: tweetId } : { id?: string }= req.params;

    const { role: userRole } : { role?: Role } = (await getUserById(userId)).body;
    const { tweetOwner }  = await tweetRepository.getTweetById(tweetId);
    const { role: ownerRole } : { role?: Role }= (await getUserById(tweetOwner.toString())).body;

    const isDeletedByUser: boolean = userRole === "user" && tweetOwner.toString() !== userId;
    const isDeleteByManager: boolean = userRole === 'manager' && ownerRole === 'manager';

    if (isDeletedByUser)
        throw new Error("user cant delete another user tweet");

    if (isDeleteByManager)
        throw new Error("manager cant delete another manager tweet");


    const session: mongoose.mongo.ClientSession = await mongoose.startSession();
    session.startTransaction();

    await deleteTweetsAndComments(tweetId)
        .catch(async (error: Error) => {
            await session.abortTransaction();
            session.endSession();
            return {
                status: 400,
                body: error.message
            };
        });
    await session.commitTransaction();
    session.endSession();
    return {
        status: 200,
        body: 'the tweet delete sucssesfuly'
    };

}
export const updateComments = async (req: Request, newTweetId: string): Promise<DocTweetResponse> => {
    const { id: fatherTweet } : { id?: string } = req.params;
    const res: TweetDocument = await tweetRepository.updateComments(fatherTweet, newTweetId);
    return {
        status: 200,
        body: res
    }

}
export const updateLikes = async (req: Request, userId: string): Promise<DocTweetResponse> => {
    const { id: fatherTweet } : { id?: string } = req.params;
    const res: TweetDocument = await tweetRepository.updateLikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}
export const updateDislikes = async (req: Request, userId: string): Promise<DocTweetResponse> => {
    const { id: fatherTweet } : { id?: string } = req.params;
    const res: TweetDocument = await tweetRepository.updateDislikes(fatherTweet, userId);
    return {
        status: 200,
        body: res
    }

}

export const getTweetById = async (req: Request): Promise<DocTweetResponse> => {
    const { id: tweetId } : { id?: string }= req.params;
    const tweet: TweetDocument = await tweetRepository.getTweetById(tweetId);
    return {
        status: 200,
        body: tweet
    }
}

export const getAllTweets = async (req: Request): Promise<DocArrTweetResponse> => {
    const { search } : { search?: string } = req.query;
    const query = search ? { text: { $regex: search, $options: 'i' } } : {};

    const tweets: Array<TweetDocument> = await tweetRepository.getAllTweets(query);
    return {
        status: 200,
        body: tweets
    }
}

export const getTweetsByDate = async (req: Request): Promise<DocArrTweetResponse> => {
    const { date }  : { date?: string } = req.query;
    const tweets: Array<TweetDocument> = await tweetRepository.getTweetsByDate(new Date(date.toString()));
    return {
        status: 200,
        body: tweets
    }
}
export const getTweetsByLikes = async (req: Request): Promise<DocArrTweetResponse> => {
    const { amount } : { amount?: string }= req.query;
    const amountNumber: number = +amount;
    if (isNaN(amountNumber)) throw new Error('Invalid amount');

    const tweets: Array<TweetDocument> = await tweetRepository.getTweetsByLikes(amountNumber);
    return {
        status: 200,
        body: tweets
    }

};
export const getTweetsByOwener = async (req: Request): Promise<DocArrTweetResponse> => {
    const { owner } : { owner?: string }= req.query;
    const tweets: Array<TweetDocument> = await tweetRepository.getTweetsByOwener(owner.toString());
    return {
        status: 200,
        body: tweets
    }

};



