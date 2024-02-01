import { Request, Response } from 'express';
import * as tweetManager from './Tweet.manager'
import TweetDocument from '../../../types/tweet.type';
import { DocTweetResponse,DocArrTweetResponse, DeleteResponse, DocResponse} from '../../../types/response.type'


export const addTweet = async (req: Request, res: Response) : Promise<Response>=> {
    const { status , body } : DocResponse = await tweetManager.addTweet(req, res.locals.userId)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};

export const deleteTweet = async (req: Request, res: Response) : Promise<Response> => {
    const { status, body } : DeleteResponse = await tweetManager.deleteTweet(req, res.locals.userId)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};

export const updateComments = async (req: Request, res: Response) : Promise<Response> => {
    const newTweet : DocTweetResponse = await tweetManager.addTweet(req, res.locals.userId)
    const { status, body } : DocResponse= await tweetManager.updateComments(req, newTweet.body._id)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const updateLikes = async (req: Request, res: Response) : Promise<Response> => {
    const { status, body } : DocResponse= await tweetManager.updateLikes(req, res.locals.userId)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const updateDislikes = async (req: Request, res: Response) : Promise<Response> => {

    const { status, body } :DocResponse = await tweetManager.updateDislikes(req, res.locals.userId)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);
};
export const getAllTweets = async (req: Request, res: Response) : Promise<Response> => {
    const { status, body } : DocResponse= await tweetManager.getAllTweets(req)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetById = async (req: Request, res: Response) : Promise<Response> => {

    const { status, body } : DocResponse = await tweetManager.getTweetById(req)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetsByDate = async (req: Request, res: Response) : Promise<Response> => {

    const { status, body } :DocResponse= await tweetManager.getTweetsByDate(req)
        .catch((error : Error) => {
            return { status: 400, body: error.message }

        });
    return res.status(status).send(body);

};
export const getTweetsByLikes  = async (req: Request, res: Response) : Promise<Response> => {

    const { status, body } : DocResponse = await tweetManager.getTweetsByLikes(req)
        .catch((error : Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
export const getTweetsByOwener = async (req: Request, res: Response) : Promise<Response> => {
    const  { status, body } : DocResponse = await tweetManager.getTweetsByOwener(req)
        .catch((error : Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
