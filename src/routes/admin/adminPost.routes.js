
import { Router } from "express";
import { webTokenVerification } from "../../middlewares/auth.middleware.js";
import { upload } from "../../utils/imageUpload.js";
import csrfProtection from "../../middlewares/csrf.js";
import { createPost, allPostList, getPost, postDeleteByID, postEditByID, postEditGetByID } from "../../controllers/admin/adminPost.controller.js";



const router = Router();
router.get('/admin/allpost',webTokenVerification, allPostList)
router.post('/admin/posts/delete/:id', webTokenVerification, postDeleteByID)
router.get("/admin/posts/create", webTokenVerification,  csrfProtection, getPost)
router.post("/admin/posts/create", upload.single("image"), webTokenVerification, csrfProtection, createPost)
router.get('/admin/posts/edit/:id',upload.single("image"), webTokenVerification, csrfProtection, postEditGetByID)
router.post('/admin/posts/edit/:id',upload.single("image"), webTokenVerification,csrfProtection, postEditByID)





export default router;