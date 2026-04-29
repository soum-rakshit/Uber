import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/rides.routes.js";

const app = express();

// Initialize Database Connection
connectToDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use("/map", mapRoutes);
app.use("/ride", rideRoutes);

export default app;
