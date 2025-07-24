import mongoose from "mongoose";
import ATSCenter from "../models/ATSCenter.js";
import asyncHandler from "express-async-handler";

export const getAllAtsByID = asyncHandler(async (req, res) => {
  try {
    const ats = await ATSCenter.find({});

    if (!ats || ats.length === 0) {
      return res.status(404).json({ message: "No ATS Centers found" });
    }

    const atids = ats.map((ats) => ({ _id: ats._id, name: ats.name,code: ats.code }));

    res.status(200).json(atids);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
export const createNewAts=asyncHandler(async (req, res) => {
    const {name,latitude,longitude,code} = req.body;

    try{
        const atsCenter=new ATSCenter({
            name,
            code,
            latitude,
            longitude
        });
        await atsCenter.save();
        res.status(201).json({
            message: "ATS Center created successfully",
            atsCenter,
        });
    }
    catch(err){
        res.status(500).json({
            message: "Error creating ATS Center",
            error: err.message,
        });
    }
    
})