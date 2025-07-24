import express from 'express';
import { createNewAts, getAllAtsByID } from '../controllers/atsController.js';
import { authorize, protect } from '../middleware/authMiddle.js';


const router=express.Router();



router.get("/allatsIds",protect,getAllAtsByID);
router.post("/createnew",protect,authorize("SUPER_ADMIN"),createNewAts)
export default router;