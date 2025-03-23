import express from "express"
import {generateImage} from "../controllers/imageController.js"
const imageRouter=express.Router()
import { userAuth } from "../middlewares/auth.js"
imageRouter.post('/generate-image',userAuth, generateImage) // we use here middle ware as generateImage controller fnction need id in body that will be append by middle ware here
export default imageRouter