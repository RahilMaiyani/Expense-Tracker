// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
  try {
    let token = null;

    // 1) Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2) Optionally check cookie (if you're using cookie-based JWT)
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing from protect" });
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // fetch user and attach to req (omit password)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "No user found for token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("protect middleware error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};


export const getAllUsers = async (req, res) => {
  try{
    let token = null;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
      token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
      return res.status(401).json({message : "Not Authorized or token missing"});
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded || !decoded.userId){
      return res.status(401).json({message : "Invalid token"});
    }

    return res.status(200).json({message : "Authorized", userId : decoded.userId, data : await User.find().select("-password")});
  }
  catch(error){
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
}