import { Router } from "express";
import authRouter from "./authRouter";
import domainRouter from "./domainRouter";
import requireAuth from "../middleware/requireAuth";

const apiRouter = Router()
  .use("/auth", authRouter)
  .use("/domain", requireAuth, domainRouter);

export default apiRouter;
