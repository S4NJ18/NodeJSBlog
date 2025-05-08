import {signInHandler, signUpHandler, logoutHandler} from "../controllers/auth.controller.js"
import {Router} from "express";
const router = Router()



router.get("/login", (req, res)=>{ res.render("login"); });
router.post('/login', signInHandler)

router.get("/signup", (req, res)=>{ res.render("signup")});
router.post("/signup", signUpHandler) 

router.get("/logout",logoutHandler)

export default router;