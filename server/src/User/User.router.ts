const express= require('express')

import * as userController from './User.controller'
import * as userValidator from './User.validator'

import auth from '../utils/auth'

const userRouter = express.Router();

userRouter.post("/addUser",userValidator.registerValidate, userController.addUser);
userRouter.post("/addLogin", userValidator.loginValidate, userController.addLogin);
userRouter.get("/getUserById/:id",userValidator.idValidate, userController.getUserById);
userRouter.patch("/addFollow/:id", auth , userValidator.idValidate, userController.updateFollow);
userRouter.patch("/addUnfollow/:id", auth, userValidator.idValidate, userController.updateUnfollow);
userRouter.patch("/updateRole/:role", auth, userValidator.roleValidate, userController.updateRoll);

export default userRouter;