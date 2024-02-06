import express, { Application } from "express";
import cors from "cors";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app: Application = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
