import express from 'express'
import{ registerUser,loginUser, userCredits, paymentRazorpay} from '../controllers/userController.js'
import {userAuth} from '../middlewares/auth.js'
const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
export default userRouter
// test it by postman 
//localhost:4000/api/user/register --register api

//localhost:4000/api/user/login  -- login api