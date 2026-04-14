import { config } from "dotenv";

config({path: ".env"});

export const { PORT, MONGODB_URI,
    JWT_EXPIRES_IN, JWT_SECRET
 } = process.env;