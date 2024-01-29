
import { Request, Response } from 'express';
import * as tweetManager from './Tweet.manager'

export const addTweet = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.addTweet(req,  res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};

export const deleteTweet = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.deleteTweet(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const updateComments = async (req: Request, res: Response) => {
    try{
        const newTweet= await tweetManager.addTweet(req, res.locals.userId);//create new tweet

        const response= await tweetManager.updateComments(req, newTweet.body._id);// 
        return res.status(response.status).send(response.body);
    }
    catch(error){
        return res.status(400).send(error.message);
    }

};
export const updateLikes = async (req: Request, res: Response) => {
    try{
        const response= await tweetManager.updateLikes(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch(error){
        return res.status(400).send(error.message);
    }
};
export const getAllTweets = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.getAllTweets(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getTweetById = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.getTweetById(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getTweetsByDate = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.getTweetsByDate(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getTweetsByLikes = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.getTweetsByLikes(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getTweetsByOwener = async (req: Request, res: Response) => {
    try {
        const response = await tweetManager.getTweetsByOwener(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
