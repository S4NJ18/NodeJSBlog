
import { Router } from "express";
import { webTokenVerification } from "../../middlewares/auth.middleware.js";
import { createPost, allPostList, getPost, postDeleteByID, postEditByID, postEditGetByID } from "../../controllers/admin/adminPost.controller.js";



const router = Router();
router.get('/admin/allpost',webTokenVerification, allPostList)


router.delete('/admin/posts/delete/:id', webTokenVerification, postDeleteByID)

router.get('/admin/posts/edit/:id', webTokenVerification, postEditGetByID)
router.post('/admin/posts/edit/:id', webTokenVerification, postEditByID)



router.get("/admin/posts/create", webTokenVerification, getPost)
router.post("/admin/posts/create", webTokenVerification, createPost)


export default router;