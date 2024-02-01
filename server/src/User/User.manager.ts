import { Request } from "express";
import * as userRepository from "./User.repository";
import { generateToken } from '../utils/jwt'
import UserDocument from "../../../types/user.type";
import { LoginDocResponse, DocUserResponse } from '../../../types/response.type';
import bcrypt from 'bcrypt';


const checkIfUserExists = async (email: string): Promise<UserDocument> => {
  const user : UserDocument = await userRepository.getUserByEmail(email)
  return user || null; 
};

export const addUser = async (req: Request): Promise<DocUserResponse> => {
  const { body } : { body : UserDocument} = req;
  if (await checkIfUserExists(body.email)) {
    throw new Error("Already in the system");
  }
  const newUser : UserDocument = await userRepository.addUser(body)
  return {
    status: 201,
    body: newUser
  };

}

export const addLogin = async (req: Request): Promise<LoginDocResponse> => {
  const { body } : { body : UserDocument} = req;
  const currrentUser : UserDocument | null = await checkIfUserExists(body.email)

  const isValidPassword : boolean= !(await bcrypt.compare(body.password, currrentUser.password))
  if ( !currrentUser || isValidPassword ) throw new Error('email or password isnt valid')

  const token: string =  generateToken(currrentUser._id);
  return {
    status: 201,
    body: { user: currrentUser, token: token }
  };
}

export const getUserById = async (id: string) : Promise<DocUserResponse>=> {
  const user : UserDocument = await userRepository.getUserById(id);
  return {
    status: 200,
    body: user
  }
}

export const updateFollow = async (req: Request, userId: string): Promise<DocUserResponse> => {
  const { id: followId } = req.params;
  if (!(await userRepository.getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser: UserDocument = await userRepository.updateFollow(userId, followId);
  return {
    status: 200,
    body: updateUser
  };

}
export const updateUnfollow = async (req: Request, userId: string):Promise<DocUserResponse> => {
  const { id: followId } = req.params;
  if (!(await userRepository.getUserById(followId))) throw new Error('this user isnt exist');
  const updateUser : UserDocument = await userRepository.updateUnfollow(userId, followId)
  return {
    status: 200,
    body: updateUser
  };

};
export const updateRoll = async (req: Request, userId: string): Promise<DocUserResponse> => {
  const { role } = req.params;
  const updateUser: UserDocument = await userRepository.updateRoll(userId, role);
  return {
    status: 200,
    body: updateUser
  };

};



