import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken=(payload: Object)=>{
    try{
        const token= jwt.sign({...payload}, process.env.JWT_SECRET_CODE, {expiresIn: "2h"});
        console.log(process.env.JWT_SECRET_CODE);
        
        return token;
    }
    catch(error){
        throw new  Error(error.message)
    }

}

export const decodeToken=(token:string)=>{
    try{
        const payload= jwt.verify(token,process.env.JWT_SECRET_CODE)
        return payload;
    }
    catch(error){
        throw new  Error(error.message)
    }

}