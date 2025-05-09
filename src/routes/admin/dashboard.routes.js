import {Router} from "express"

import { webTokenVerification } from "../../middlewares/auth.middleware.js"

import { dashboardHandler } from "../../controllers/dashboard.controller.js"

const router = Router()


router.get("/dashboard",webTokenVerification, dashboardHandler)

export default router;