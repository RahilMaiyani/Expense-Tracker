import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) res.status(401).json({ message: "Not authorized, no token" });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) res.status(401).json({ message: "Not authorized, user not found" });

        req.user = user;

        next();

    }
    catch(error){
        console.error(error);
        next(error);
    }
}

export default authorize;