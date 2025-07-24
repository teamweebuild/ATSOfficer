// import mongoose from "mongoose";


// export const protect=async (req, res, next) => {
//     const token=req.headers.authorization;
//     if (!token || !token.startsWith("Bearer")) {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }
//     try {
//         const decoded = mongoose.Types.ObjectId(token.split(" ")[1]);
//         req.user = await User.findById(decoded.id).select("-password");
//         if (!req.user) {
//             return res.status(401).json({ message: "Not authorized, user not found" });
//         }
//         next();
//     } catch (error) {
//         console.error("Error in authentication middleware:", error);
//         res.status(401).json({ message: "Not authorized, token failed" });
//     }
  
// }
// export const authorize = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         res.status(403);
//         throw new Error(`Role ${req.user.role} is not authorized to access this resource`);
//       }
//       next();
//     };
//   };
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("Protect middleware called");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
     
      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role ${req.user.role} is not authorized to access this resource`);
    }
    next();
  };
};