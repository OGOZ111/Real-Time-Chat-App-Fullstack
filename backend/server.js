// Package imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// Connection to MongoDB import
import connectToMongoDB from "./db/connectToMongoDB.js";

// Variables
const app = express();
const PORT = process.env.PORT || 5000;

// Config .env file to use environment variables
dotenv.config();

// Parsing to execute before the routes
app.use(express.json()); // parse json data from the request body
app.use(cookieParser()); // parse cookies from the request headers and set them in req.cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//app.get("/", (req, res) => {
// root route http://localhost:5000/
//res.send("Hello World!!!");
// });

// Server listen and connect to MongoDB log
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
