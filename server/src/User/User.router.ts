import express from 'express';
import * as userController from './User.controller'

import auth from '../utils/auth'

const userRouter = express.Router();

userRouter.post("/addUser", );
userRouter.post("/login", );
userRouter.patch("/addFollow/:followId", auth, );
userRouter.patch("/addUnfollow/:followId", auth, );
userRouter.patch("/updateRole/:role", auth, );

export default userRouter;