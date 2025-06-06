import {getSignInHandler,postSignInHandler, GetSignUpHandler, logoutHandler, PostSignUpHandler} from "../controllers/auth.controller.js"
import {Router} from "express";
import { userTokenVerification } from "../middlewares/auth.middleware.js";
import {loginLimit}  from "../middlewares/rateLimit.middleware.js";
const router = Router()

router.get("/login",userTokenVerification, getSignInHandler);
router.post('/login', loginLimit, postSignInHandler)

router.get("/signup", userTokenVerification, GetSignUpHandler);
router.post("/signup", PostSignUpHandler) 

router.get("/logout",logoutHandler)

export default router;