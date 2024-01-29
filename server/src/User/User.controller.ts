
import { Request, Response } from 'express';
import {
    userLogin,
    userRegister,
    userFollow,
    userUnfollow,
    userChangeRole,
    UserById
} from './User.manager';


export const register = async (req: Request, res: Response) => {
    try {
        const response = await userRegister(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};

export const login = async (req: Request, res: Response) => {
    try {
        const response = await userLogin(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getbyId = async (req: Request, res: Response) => {
    try {
        const response = await UserById(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const follow = async (req: Request, res: Response) => {
    try {
        const response = await userFollow(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const unfollow = async (req: Request, res: Response) => {
    try {
        const response = await userUnfollow(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const changeRole = async (req: Request, res: Response) => {
    try {
        const response = await userChangeRole(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
