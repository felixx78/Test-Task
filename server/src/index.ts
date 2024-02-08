import express, { Application } from "express";
import cors from "cors";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);

const app: Application = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
