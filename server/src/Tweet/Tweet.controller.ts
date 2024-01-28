
import { Request, Response } from 'express';
import {
    tweetDelete,
    getTweetsByDate,
    getTweetsByLikes,
    getTweetsByOwner,
    tweetPost,
    updateComments,
    updateLikes
} from './Tweet.manager'

export const postTweet = async (req: Request, res: Response) => {
    try {
        const response = await tweetPost(req,  res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};

export const deleteTweet = async (req: Request, res: Response) => {
    try {
        const response = await tweetDelete(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const addComment = async (req: Request, res: Response) => {
    try{
        const newTweet= await tweetPost(req, res.locals.userId)

        const response= await updateComments(req,newTweet.body._id);
        //return res.status(response.status).send(response.body);
    }
    catch(error){
        return res.status(400).send(error.message);
    }

};
export const addLike = async (req: Request, res: Response) => {
    
};
export const getByDate = async (req: Request, res: Response) => {
    try {
        const response = await getTweetsByDate(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getByLikes = async (req: Request, res: Response) => {
    try {
        const response = await getTweetsByLikes(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getByOwner = async (req: Request, res: Response) => {
    try {
        const response = await getTweetsByOwner(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
