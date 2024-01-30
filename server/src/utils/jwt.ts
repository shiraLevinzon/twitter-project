import dotenv from 'dotenv';
//import jwt from 'jsonwebtoken';
const jwt= require('jsonwebtoken');
dotenv.config();
import UserDocument from "../../../types/user.type";

export const generateToken = async (userId: string): Promise<string> => {
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET_CODE, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    }
    catch (error) {
        throw new Error(error.message)
    }
}
// : Promise<UserDocument> 
export const decodeToken = async (token: string)=> {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_CODE);
        return payload.userId;
    }
    catch (error) {
        throw new Error(error.message)
    }
}