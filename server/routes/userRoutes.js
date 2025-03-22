import express from 'express'
import{ registerUser,loginUser, userCredits} from '../controllers/userController.js'
import {userAuth} from '../middlewares/auth.js'
const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/credits',userAuth,userCredits)
export default userRouter
// test it by postman 
//localhost:4000/api/user/register --register api

//localhost:4000/api/user/login  -- login api