import express from 'express';
import userController from '../controller/userController';

const userRouter=express.Router();

userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login)

export default userRouter;