import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const generateToken = (userId: string): string => {
    try {
        const token :string  =  jwt.sign({userId}, process.env.JWT_SECRET_CODE, { expiresIn: process.env.JWT_EXPIRES_IN })
        return token;
    }
    catch (error) {
        throw new Error(error.message)

    }
}
export const decodeToken =  (token: string) : string  => {
    try {
        const {userId}=  jwt.verify(token, process.env.JWT_SECRET_CODE) as JwtPayload
        return userId; 
    }
    catch (error) {
        throw new Error(error.message)
    }
}