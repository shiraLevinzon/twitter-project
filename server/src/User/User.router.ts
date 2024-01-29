import express from 'express';
import {
  register,
  login,
  follow,
  unfollow,
  changeRole,
  getbyId
} from './User.controller'

import auth from '../utils/auth'

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/getById/:id", getbyId );
userRouter.patch("/follow/:followId", auth, follow);
userRouter.patch("/unfollow/:followId", auth, unfollow);
userRouter.patch("/changeRole/:role", auth, changeRole);

export default userRouter;