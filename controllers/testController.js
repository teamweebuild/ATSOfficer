

import TestInstance from '../models/TestInstance.js';
import asyncHandler from 'express-async-handler';
import Vehicle from '../models/Vehicle.js';
import FunctionalTest from '../models/FunctionalTest.js';
import VisualTest from '../models/VisualTest.js';

export const VehiclesForTest = asyncHandler(async (req, res) => {


  try{
    const TestInstances=await TestInstance.find();
    if(!TestInstances || TestInstances.length === 0) {
      return res.status(404).json({ message: 'No test instances found' });
    }
    res.status(200).json(TestInstances);
  }
  catch (error) {
    console.error('Error fetching test instances:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})