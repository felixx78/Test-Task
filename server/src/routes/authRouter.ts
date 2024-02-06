import { Request, Response, Router } from "express";
import User from "../models/user";
import hashPassword from "../utils/hashPassword";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

const authRouter = Router()
  .post("/signup", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).json("No username provided");
      }

      if (!password) {
        return res.status(400).json("No password provided");
      }

      const isUserExist = await User.findOne({ username: username });

      if (isUserExist) {
        return res.status(400).json("User already exist");
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      newUser.save();

      const refreshToken = generateRefreshToken({ username: newUser.username });
      const accessToken = generateAccessToken({ username: newUser.username });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      res.cookie("token", refreshToken, {
        httpOnly: true,
        expires: expirationDate,
      });

      return res.json({
        acessToken: accessToken,
        payload: { username: newUser.username },
      });
    } catch (e) {
      return res.status(500).end();
    }
  })
  .post("/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).json("No username provided");
      }

      if (!password) {
        return res.status(400).json("No password provided");
      }

      const userFind = await User.findOne({ username: username });

      if (!userFind) {
        return res.status(404).json("User does not exist");
      }

      const isPasswordMatch = await bcrypt.compare(password, userFind.password);

      if (!isPasswordMatch) {
        return res.status(401).json("Incorrect password");
      }

      const refreshToken = generateRefreshToken({
        username: userFind.username,
      });
      const accessToken = generateAccessToken({ username: userFind.username });

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      res.cookie("token", refreshToken, {
        httpOnly: true,
        expires: expirationDate,
      });

      return res.json({
        acessToken: accessToken,
        payload: { username: userFind.username },
      });
    } catch (e) {
      return res.status(500).end();
    }
  })
  .get("/refresh", async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json("No token provided");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof payload === "string") {
        return res.status(401).json("Invalid refresh token");
      }

      delete payload.iat;
      delete payload.exp;

      const newAccessToken = generateAccessToken(payload);

      return res.json(newAccessToken);
    } catch (e) {
      return res.status(500).end();
    }
  });

export default authRouter;
