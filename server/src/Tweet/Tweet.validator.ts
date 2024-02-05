import { NextFunction, Request, Response } from 'express';
import Joi , {ObjectSchema, ValidationResult} from 'joi';

export const addTweetValidate = (req: Request, res: Response, next: NextFunction) => {
    const tweet : ObjectSchema = Joi.object().keys(
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

    const validate : ValidationResult = tweet.validate(req.body);

    if (validate.error) return res.status(401).send(validate.error.message);

    next();
}
export const idValidate = (req: Request, res: Response, next: NextFunction) => {
    const idVal : ObjectSchema = Joi.object(
        {
            id: Joi.string().required()
        })

    const validate : ValidationResult = idVal.validate(req.params);

    if (validate.error) return res.status(401).send(validate.error.message);

    next();
}