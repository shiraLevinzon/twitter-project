import { Request, Response, NextFunction } from "express";
import { decodeToken } from "./jwt";
import split from 'lodash/fp/split';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const bearerToken: string = req.headers["authorization"];
    if (!bearerToken) return res.status(401).send("provide token");
    try {
        const token: string = split(" ")(bearerToken)[1];        
        const payload: string = decodeToken(token);
        res.locals.userId = payload;
        next();
    } catch (error) {
        next(error.message);
    }
}

export default auth;