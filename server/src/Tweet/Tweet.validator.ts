import { NextFunction, Request, Response } from 'express';
const Joi = require('joi');

export const addTweetValidate = (req: Request, res: Response, next: NextFunction) => {
    const tweet = Joi.object().keys(
        {
            text: Joi.string().required(),
            image: Joi.string(),
            dateCreated: Joi.date()
                .default(() => new Date()),
            comments: Joi.array()
                .items(Joi.string()),
            tweetOwner: Joi.string(),
            likes: Joi.array()
                .items(Joi.string())
        })

    const validate = tweet.validate(req.body);

    if (validate.error) return res.status(401).send(validate.error.message);

    next();
}
export const idValidate = (req: Request, res: Response, next: NextFunction) => {
    const idVal = Joi.object(
        {
            id: Joi.string().required()
        })

    const validate = idVal.validate(req.params);

    if (validate.error) return res.status(401).send(validate.error.message);

    next();
}