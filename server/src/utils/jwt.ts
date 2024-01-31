import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

export const generateToken = async (userId: string): Promise<string> => {
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET_CODE, { expiresIn: process.env.JWT_EXPIRES_IN })
        // .catch((error: Error)=>{
        //     throw new Error(error.message)
        // })
        return token;
    }
    catch (error) {
        throw new Error(error.message)

    }
}
export const decodeToken = async (token: string) : Promise<string> => {
    try {
        // const payload : string | JwtPayload = await jwt.verify(token, process.env.JWT_SECRET_CODE) 
        // if (typeof payload==='string') throw new Error(payload + "  fhhgfh")
        // return payload.userId; 

        const {userId} = await jwt.verify(token, process.env.JWT_SECRET_CODE) as JwtPayload
        return userId; 


    }
    catch (error) {
        throw new Error(error.message)
    }
}