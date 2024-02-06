import { Request, Response, Router } from "express";
import User from "../models/user";
import hashPassword from "../utils/hashPassword";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

const authRouter = Router().post(
  "/signup",
  async (req: Request, res: Response) => {
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
  }
);

export default authRouter;
