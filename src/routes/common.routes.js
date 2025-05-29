import {Router} from "express";
import { homeHandler,aboutHandler } from "../controllers/common.controller.js";
import { webTokenVerification } from "../middlewares/auth.middleware.js";


const router = Router();
router.get("/", homeHandler)

router.get("/about", aboutHandler)

export default router;