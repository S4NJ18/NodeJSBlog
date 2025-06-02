import { Router } from "express";
import { webTokenVerification } from "../../middlewares/auth.middleware.js";
import { upload } from "../../utils/imageUpload.js";

import { allCategoryList,categoryDeleteByID, getCategory,saveCategory,categoryEditGetByID, categoryEditByID } from "../../controllers/admin/adminCategory.controller.js";


const router = Router();
router.get('/admin/all-category',webTokenVerification, allCategoryList)
router.post('/admin/category/delete/:id', webTokenVerification, categoryDeleteByID)
router.get("/admin/category/create", webTokenVerification, getCategory)
router.post("/admin/category/create",upload.single("image"), webTokenVerification, saveCategory)
router.get('/admin/category/edit/:id',upload.single("image"), webTokenVerification, categoryEditGetByID)
router.post('/admin/category/edit/:id',upload.single("image"), webTokenVerification, categoryEditByID)


export default router;