import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.get('/all', authorize, getAllUsers);

export default userRouter;