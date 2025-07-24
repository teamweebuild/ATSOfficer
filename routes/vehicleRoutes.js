import mongoose from "mongoose";
import express from "express";
import { getAllVehices, getVehiclesByatsId } from "../controllers/vehicleController.js";
import { authorize, protect } from "../middleware/authMiddle.js";

const router = express.Router();
router.get("/getVehices",protect,getAllVehices);
router.get("/getVehices/:atsId",protect, getVehiclesByatsId);

export default router;