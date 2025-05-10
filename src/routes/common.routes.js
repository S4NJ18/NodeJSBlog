import {Router} from "express";
import { homeHandler } from "../controllers/common.controller.js";


const router = Router();
router.get("/", homeHandler)

// router.get('/:id', (req, res) =>{
//       res.status(404).render('NotFound');
// })


export default router;