// controllers/auth.controller.js
import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from "bcryptjs";

/**
 * POST /api/auth/sign-up
 */
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name: name.trim(), email: email.toLowerCase().trim(), password: hashedPassword });
    await user.save({ session });

    // create token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, createdAt: user.createdAt },
    });
  } catch (error) {
    try {
      await session.abortTransaction();
    } catch (e) {
      // ignore abort errors
    }
    session.endSession();
    next(error);
  }
};

/**
 * POST /api/auth/sign-in
 */
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // If you use cookies: res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: ... });
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/sign-out
 * For stateless JWT signout, instruct client to delete token. If you use cookies, clear it here.
 */
export const signOut = async (req, res) => {
  try {
     let token = null;
    
      // 1) Check Authorization header
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
      }
      console.log(req.headers);
  
      // 2) Optionally check cookie (if you're using cookie-based JWT)
      if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
  
      if (!token) {
        return res.status(401).json({ message: "Not authorized, token missing from sign-out" });
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

    console.log("Signing out user:", user.email);
  
    req.headers.authorization = null;

    
    return res.status(200).json({
      success: true,
      message: "Signed out successfully. Please remove token client-side (localStorage/cookie).",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error signing out", error });
  }
};
