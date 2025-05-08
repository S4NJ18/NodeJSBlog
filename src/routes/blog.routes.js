import { Router } from "express";
import { getBlog, postBlog, blogList, blogOpen} from "../controllers/blog.controller.js";
import { tokenVerification,webTokenVerification } from "../middlewares/auth.middleware.js";

const router = Router()


router.get("/blogs",blogList)
router.get("/blogs/:slug", blogOpen)
router.get("/blog/create", webTokenVerification, getBlog)
router.post("/blog/create", webTokenVerification, postBlog)



export default router;