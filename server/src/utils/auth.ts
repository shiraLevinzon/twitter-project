import { Request, Response, NextFunction } from "express";
import { decodeToken } from "./jwt";
const _ = require('lodash');


const auth = async (req: Request, res: Response, next: NextFunction) : Promise<Response>=> {

    const bearerToken: string = req.headers["authorization"];
    if (!bearerToken) return res.status(401).send("provide token");
    try {
        const token = _.split(bearerToken, " ")[1];
        const payload = await decodeToken(token);
        res.locals.userId = payload._id;
        next();
    }
    catch (error) {
        next(error)
    }

}

export default auth;