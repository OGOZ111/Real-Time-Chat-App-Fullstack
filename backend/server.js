// Package imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

// Routes imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

// Connection to MongoDB import
import connectToMongoDB from "./db/connectToMongoDB.js";

// Variables
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Config .env file to use environment variables

dotenv.config();

// Parsing to execute before the routes
app.use(express.json()); // parse json data from the request body
app.use(cookieParser()); // parse cookies from the request headers and set them in req.cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Server listen and connect to MongoDB log
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
