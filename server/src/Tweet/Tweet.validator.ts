import Joi from 'joi';

const tweetJoiScheme = Joi.object(
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



export default tweetJoiScheme;