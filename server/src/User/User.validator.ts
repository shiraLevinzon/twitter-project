import Joi from 'joi';
import mongoose from 'mongoose';

const objectId = Joi.extend((joi) => ({
  type: 'objectId',
  base: joi.string(),
  messages: {
    'objectId.base': '{{#label}} must be a valid MongoDB ObjectID',
  },
  validate(value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error('objectId.base') };
    }
  },
}));

const userJoiScheme =
{
  login: Joi.object().keys({

    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  }),

  register: Joi.object().keys({
    userName: Joi.string()
      .min(3)
      .max(30)
      .required(),

    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(8)
      .required(),

    dateCreated: Joi.date()
      .default(() => new Date()),

    location: Joi.string(),

    image: Joi.string(),

    role: Joi.string()
      .valid('manager', 'user')
      .default('user'),

    followers: Joi.array()
      .items(Joi.string())
  })

}


export default userJoiScheme;