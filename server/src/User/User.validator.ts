import { NextFunction, Request, Response } from 'express';
import Joi , {ObjectSchema, ValidationResult} from 'joi';

export const loginValidate = (req: Request, res: Response, next: NextFunction): Response => {
  const login : ObjectSchema= Joi.object().keys({

    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

  })
  const validate : ValidationResult = login.validate(req.body);

  if (validate.error) return res.status(401).json(validate.error.message);

  next();

}

export const registerValidate = (req: Request, res: Response, next: NextFunction): Response => {
  const register : ObjectSchema = Joi.object().keys({
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


  const validate  : ValidationResult = register.validate(req.body);

  if (validate.error) return res.status(401).send(validate.error.message);

  next();

}

export const idValidate = (req: Request, res: Response, next: NextFunction): Response => {
  const idVal : ObjectSchema = Joi.object().keys({
    id: Joi.string().required()
  })
  const validate  : ValidationResult = idVal.validate(req.params);

  if (validate.error) return res.status(401).send(validate.error.message);

  next();
}

export const roleValidate = (req: Request, res: Response, next: NextFunction): Response=> {
  const role : ObjectSchema = Joi.object().keys({
    role: Joi.string().valid('manager', 'user').required()
  })
  const validate  : ValidationResult = role.validate(req.params);

  if (validate.error) return res.status(401).send(validate.error.message);

  next();
}

