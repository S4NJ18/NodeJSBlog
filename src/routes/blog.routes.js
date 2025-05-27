import { Router } from "express";
import {blogList, blogOpen} from "../controllers/blog.controller.js";
import { webTokenVerification } from "../middlewares/auth.middleware.js";

const router = Router()


router.get("/blogs",blogList)
router.get("/blogs/:slug",blogOpen)

export default router;