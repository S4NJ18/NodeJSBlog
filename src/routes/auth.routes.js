import {getSignInHandler,postSignInHandler, GetSignUpHandler, logoutHandler, PostSignUpHandler} from "../controllers/auth.controller.js"
import {Router} from "express";
import { userTokenVerification } from "../middlewares/auth.middleware.js";
import {loginLimit}  from "../middlewares/rateLimit.middleware.js";
import csrfProtection from "../middlewares/csrf.js";
const router = Router()

router.get("/login",userTokenVerification, csrfProtection, getSignInHandler);
router.post('/login', loginLimit, csrfProtection, postSignInHandler)

router.get("/signup", userTokenVerification, csrfProtection, GetSignUpHandler);
router.post("/signup", csrfProtection, PostSignUpHandler) 

router.get("/logout",logoutHandler)

export default router;