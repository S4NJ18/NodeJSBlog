import { Router } from "express";
import { webTokenVerification } from "../../middlewares/auth.middleware.js";
import { upload } from "../../utils/imageUpload.js";
import { allCategoryList,categoryDeleteByID, getCategory,saveCategory,categoryEditGetByID, categoryEditByID } from "../../controllers/admin/adminCategory.controller.js";
import csrfProtection from "../../middlewares/csrf.js";


const router = Router();
router.get('/admin/all-category',webTokenVerification, allCategoryList)
router.post('/admin/category/delete/:id', webTokenVerification, categoryDeleteByID)
router.get("/admin/category/create", webTokenVerification, csrfProtection, getCategory)
router.post("/admin/category/create",upload.single("image"), webTokenVerification, csrfProtection, saveCategory)
router.get('/admin/category/edit/:id',upload.single("image"), webTokenVerification, csrfProtection, categoryEditGetByID)
router.post('/admin/category/edit/:id',upload.single("image"), webTokenVerification, csrfProtection, categoryEditByID)


export default router;