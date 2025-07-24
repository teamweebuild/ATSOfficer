import express from 'express';
import { VehiclesForTest } from '../controllers/testController.js';
import { protect } from '../middleware/authMiddle.js';

const router = express.Router();

// GET request to fetch vehicles for testing
router.get("/getVehiclesForTest", protect,VehiclesForTest);

export default router;
