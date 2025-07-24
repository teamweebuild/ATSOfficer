import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Vehicle from "../models/Vehicle.js";
import asyncHandler from "express-async-handler";
import ATSCenter from "../models/ATSCenter.js";
import TestInstance from "../models/TestInstance.js";
export const getAllVehices=asyncHandler(async (req, res) => {
    try{
        const vehicles=await Vehicle.find({});
        if(!vehicles ||vehicles.length===0){
            res.status(404).json({Message:"No vehicles Found"})
        }
        res.status(200).json(vehicles);
    }
    catch(err){
        res.status(500).json({
            message:"no Vehicle found",
           
        });
    }
});
export const getVehiclesByatsId = asyncHandler(async (req, res) => {
    const { atsId } = req.params;
  
    try {
      const allVehicles = await Vehicle.find().populate("atsCenter");
   
      const vehicles = allVehicles.filter(
        (v) => v.atsCenter && v.atsCenter._id.toString() === atsId
      );
  
      if (!vehicles || vehicles.length === 0) {
        return res
          .status(404)
          .json({ message: "No vehicles found for this ATS Center" });
      }
  
      res.status(200).json(vehicles);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching vehicles",
        error: err.message,
      });
    }
  });