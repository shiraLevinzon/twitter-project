import { Request, Response } from 'express';
import * as tweetManager from './Tweet.manager'
import response from '../../../types/response.type';


export const addTweet = async (req: Request, res: Response) => {
    const { status, body } = await tweetManager.addTweet(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};

export const deleteTweet = async (req: Request, res: Response) => {
    const { status, body } = await tweetManager.deleteTweet(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};

export const updateComments = async (req: Request, res: Response) => {
    const newTweet = await tweetManager.addTweet(req, res.locals.userId);
    const { status, body } = await tweetManager.updateComments(req, newTweet.body._id)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const updateLikes = async (req: Request, res: Response) => {
    const { status, body } = await tweetManager.updateLikes(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const updateDislikes = async (req: Request, res: Response) => {

    const { status, body } = await tweetManager.updateDislikes(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};
export const getAllTweets = async (req: Request, res: Response) => {
    const { status, body } = await tweetManager.getAllTweets(req)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetById = async (req: Request, res: Response) => {

    const { status, body } = await tweetManager.getTweetById(req)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetsByDate = async (req: Request, res: Response) => {

    const { status, body } = await tweetManager.getTweetsByDate(req)
        .catch((error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetsByLikes = async (req: Request, res: Response) => {

    const response = await tweetManager.getTweetsByLikes(req)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(response.status).send(response.body);

};
export const getTweetsByOwener = async (req: Request, res: Response) => {
    const response = await tweetManager.getTweetsByOwener(req)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(response.status).send(response.body);

};
