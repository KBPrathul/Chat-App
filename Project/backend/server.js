// Change type from commonJS to module in package.json so that instead of require, we can use import
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongDB.js";
import { app, server } from "./socket/socket.js";

// The below line has been moved from here to the socket.js file, because we want to use the same server for both the express app and the socket.io server, so we have to create the server in the socket.js file and export it to be used in the server.js file
// const app = express();
// We dont want an hardcoded value, it comes from the .env file (So its either that value or 5000), for which we have required the library and written the above line
const PORT = process.env.PORT || 5000;
dotenv.config();

// The .use() method tells Express, "I want every single request that comes into this server to pass through this function first."
// Middleware to parse the incoming requests with JSON payloads (from req.body in auth.controller.js)
app.use(express.json());
app.use(cookieParser());

// For authentication - authRoutes are used to handle these in a clean way
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, ()=> {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});