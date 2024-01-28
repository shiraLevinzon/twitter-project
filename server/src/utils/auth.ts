import { Request, Response ,NextFunction} from "express";
import { decodeToken } from "./jwt";
import { JwtPayload } from "jsonwebtoken";


const auth=(req:Request, res:Response, next: NextFunction)=>{

    let token = req.headers["authorization"];
    if(!token) return res.status(401).send("provide token");
    try{
        token= token.split(" ")[1];
        const payload= decodeToken(token) as JwtPayload;        
        res.locals.userId= payload._doc._id;

        next();
    }
    catch(error){
        next(error)
    }

}

export default auth;