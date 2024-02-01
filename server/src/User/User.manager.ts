import { Request } from "express";
import * as userRepository from "./User.repository";
import { generateToken } from '../utils/jwt'
import UserDocument from "../../../types/user.type";
import bcrypt from 'bcrypt';


const checkIfUserExists = async (email: string): Promise<UserDocument> => {
  const user = await userRepository.getUserByEmail(email)
  if (user) return user;
  return null;
};

export const addUser = async (req: Request): Promise<{status: number, body: UserDocument}> => {
  const { body } = req;
  if (await checkIfUserExists(body.email)) {
    throw new Error("Already in the system");
  }

  const hash = await bcrypt.hash(body.password, 10);
  const updateUser = {
    ...body,
    password: hash
  }
  const newUser = await userRepository.addUser(updateUser)

  return {
    status: 201,
    body: newUser
  };

}

export const addLogin = async (req: Request): Promise<{status: number, body: {user: UserDocument, token: string}}> => {
  const { body } = req;
  const currrentUser = await checkIfUserExists(body.email)
  if (!currrentUser || (!(await bcrypt.compare(body.password, currrentUser.password)))) throw new Error('email or password isnt valid')

  const token = await generateToken(currrentUser._id);
  return {
    status: 201,
    body: { user: currrentUser, token: token }
  };
}
export const getUserById = async (id: string) : Promise<{status: number, body: UserDocument}>=> {
  const user = await userRepository.getUserById(id);
  return {
    status: 200,
    body: user
  }
}

export const updateFollow = async (req: Request, userId: string): Promise<{status: number, body: UserDocument}> => {
  const { id: followId } = req.params;
  if (!(await userRepository.getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser = await userRepository.updateFollow(userId, followId)
  return {
    status: 200,
    body: updateUser
  };

}
export const updateUnfollow = async (req: Request, userId: string):Promise<{status: number, body: UserDocument}> => {
  const { id: followId } = req.params;
  if (!(await userRepository.getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser = await userRepository.updateUnfollow(userId, followId)
  return {
    status: 200,
    body: updateUser
  };

};
export const updateRoll = async (req: Request, userId: string): Promise<{status: number, body: UserDocument}> => {
  const { role } = req.params;
  const updateUser = await userRepository.updateRoll(userId, role);
  return {
    status: 200,
    body: updateUser
  };

};



