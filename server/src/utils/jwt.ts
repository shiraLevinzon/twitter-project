const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
import UserDocument from "../../../types/user.type";

export const generateToken = async (payload: UserDocument): Promise<string> => {
    try {
        const token = await jwt.sign({ ...payload }, process.env.JWT_SECRET_CODE, { expiresIn: process.env.JWT_EXPIRES_IN });
        return token;
    }
    catch (error) {
        throw new Error(error.message)
    }
}

export const decodeToken = async (token: string): Promise<UserDocument> => {
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_CODE)
        return payload._doc;
    }
    catch (error) {
        throw new Error(error.message)
    }
}