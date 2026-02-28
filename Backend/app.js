import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectToDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Initialize Database Connection
connectToDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/users", userRoutes);

export default app;