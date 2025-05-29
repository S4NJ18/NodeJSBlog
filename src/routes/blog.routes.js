import { Router } from "express";
import {blogList, blogOpen, apiBlogList} from "../controllers/blog.controller.js";
import { webTokenVerification } from "../middlewares/auth.middleware.js";

const router = Router()

// Browser Web
router.get("/blogs",blogList)
router.get("/blogs/:slug",blogOpen)

// API END POINT ROUTER

router.get("/blog-list",apiBlogList)

export default router;