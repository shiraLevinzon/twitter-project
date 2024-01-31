import { Request, Response, NextFunction } from "express";
import { decodeToken } from "./jwt";
import split from 'lodash/split';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    const bearerToken: string = req.headers["authorization"];
    if (!bearerToken) return res.status(401).send("provide token");
    const token = split(bearerToken, " ")[1];
    const payload = await decodeToken(token).catch(err => {
        return err.message;
    })
    res.locals.userId = payload;
    next();
}

export default auth;