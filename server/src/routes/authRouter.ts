import { Request, Response, Router } from "express";
import User from "../models/user";
import hashPassword from "../utils/hashPassword";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { z } from "zod";
import validate from "../utils/validate";

const userSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(2)
      .max(16)
      .refine((value) => /^[^0-9]/.test(value), {
        message: "Username cannot start with a number",
      }),
    password: z.string().min(4).max(32),
  }),
});

const authRouter = Router()
  .post(
    "/signup",
    validate(userSchema),
    async (req: Request, res: Response) => {
      try {
        const { username, password } = req.body;

        const isUserExist = await User.findOne({ username: username });

        if (isUserExist) {
          return res.status(400).json("User already exist");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
          username: username,
          password: hashedPassword,
        });
        await newUser.save();

        const payload = {
          id: newUser._id,
          username: newUser.username,
        };

        const refreshToken = generateRefreshToken(payload);
        const accessToken = generateAccessToken(payload);

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        res.cookie("token", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          expires: expirationDate,
        });

        return res.json({
          acessToken: accessToken,
          payload,
        });
      } catch (e) {
        return res.status(500).end();
      }
    }
  )
  .post("/login", validate(userSchema), async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const userFind = await User.findOne({ username: username });

      if (!userFind) {
        return res.status(404).json("User does not exist");
      }

      const isPasswordMatch = await bcrypt.compare(password, userFind.password);

      if (!isPasswordMatch) {
        return res.status(401).json("Incorrect password");
      }
      const payload = {
        id: userFind._id,
        username: userFind.username,
      };

      const refreshToken = generateRefreshToken(payload);
      const accessToken = generateAccessToken(payload);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);

      res.cookie("token", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        expires: expirationDate,
      });

      return res.json({
        acessToken: accessToken,
        payload,
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
