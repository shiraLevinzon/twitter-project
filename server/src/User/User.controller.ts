
import { Request, Response } from 'express';
import * as userManager from './User.manager';



export const addUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.addUser(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};

export const addLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.addLogin(req);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.getUserById(req.params.id);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const updateFollow = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.updateFollow(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const updateUnfollow = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.updateUnfollow(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }

};
export const updateRoll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await userManager.updateRoll(req, res.locals.userId);
        return res.status(response.status).send(response.body);
    }
    catch (error) {
        return res.status(400).send(error.message);
    }
};
