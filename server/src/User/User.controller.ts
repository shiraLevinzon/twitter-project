
import { Request, Response } from 'express';
import * as userManager from './User.manager';



export const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { status, body } = await userManager.addUser(req)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};

export const addLogin = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } = await userManager.addLogin(req)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);



};
export const getUserById = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } = await userManager.getUserById(req.params.id)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);
};
export const updateFollow = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } = await userManager.updateFollow(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
export const updateUnfollow = async (req: Request, res: Response): Promise<Response> => {
    const { status, body } = await userManager.updateUnfollow(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);

};
export const updateRoll = async (req: Request, res: Response): Promise<Response> => {

    const { status, body } = await userManager.updateRoll(req, res.locals.userId)
        .catch((error) => {
            return { status: 400, body: error.message }
        });
    return res.status(status).send(body);
};
