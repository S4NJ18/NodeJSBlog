import {Router} from "express";
import { homeHandler } from "../controllers/common.controller.js";


const router = Router();
router.get("/", homeHandler)


export default router;