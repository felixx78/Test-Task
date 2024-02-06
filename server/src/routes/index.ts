import { Router } from "express";
import authRouter from "./authRouter";

const apiRouter = Router().use("/auth", authRouter);

export default apiRouter;
