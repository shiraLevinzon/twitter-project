
import { Request, Response } from 'express';
import * as userManager from './User.manager';
import { DocResponse , LoginDocResponse } from '../../../types/response.type';



export const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { status, body } : DocResponse = await userManager.addUser(req)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).json(body);

};

export const addLogin = async (req: Request, res: Response): Promise<Response> => {

    const { status, body }: LoginDocResponse = await userManager.addLogin(req)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);



};
export const getUserById = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } : DocResponse = await userManager.getUserById(req.params.id)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);
};

export const updateFollow = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } : DocResponse = await userManager.updateFollow(req, res.locals.userId)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
export const updateUnfollow = async (req: Request, res: Response): Promise<Response> => {
    const { status, body } : DocResponse = await userManager.updateUnfollow(req, res.locals.userId)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
export const updateRoll = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } : DocResponse = await userManager.updateRoll(req)
        .catch((error: Error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);
};
