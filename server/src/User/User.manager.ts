import { Request, Response } from "express";
import userJoiSchema from './User.validator';
import {
  getUserByEmail,
  getUserById,
  postUser,
  updateFollow,
  updateRoll,
  updateUnfollow
} from "./User.repository";
import { generateToken } from '../utils/jwt'
const bcrypt = require("bcrypt")

const checkIfUserExists = async (email: string) => {
  const user = await getUserByEmail(email)
  if (user) return user;
  return false;
};

export const userRegister = async (req: Request) => {
  const { body } = req;

  const validate = userJoiSchema.register.validate(body);
  if (validate.error) throw new Error(validate.error.message);

  if (await checkIfUserExists(body.email)) {
    throw new Error("Already in the system");
  }

  const hash = await bcrypt.hash(body.password, 10);
  body.password = hash;

  const newUser = await postUser(body)

  return {
    status: 201,
    body: newUser
  };

}

export const userLogin = async (req: Request) => {
  const { body } = req;

  const validate = userJoiSchema.login.validate(body);
  if (validate.error) throw new Error(validate.error.message)

  const currrentUser = await checkIfUserExists(body.email)
  if (!currrentUser || !(await bcrypt.compare(body.password, currrentUser.password))) throw new Error('email or password isnt valid');

  const token = generateToken(currrentUser);
  return {
    status: 201,
    body: { currrentUser, token }
  };
}
export const UserById = async (req: Request,) => {
  const { id } = req.params;
  const user = await getUserById(id);
  return {
      status: 200,
      body: user
  }
}

export const userFollow = async (req: Request, userId: string) => {
  const {  followId } = req.params;  
  if (!(await getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser = await updateFollow(userId, followId)
  return {
    status: 200,
    body: updateUser
  };

}
export const userUnfollow = async (req: Request, userId: string) => {
  const { followId } = req.params;  
  if (!(await getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser = await updateUnfollow(userId, followId)
  return {
    status: 200,
    body: updateUser
  };

};
export const userChangeRole = async (req: Request,  userId: string) => {
  const { role } = req.params;  
  if (role !== "manager" && role !== "user") {
    throw new Error('Invalid role. Allowed values are "manager" or "user".');
  }
  const updateUser = await updateRoll(userId, role);
  return {
    status: 200,
    body: updateUser
  };

};



