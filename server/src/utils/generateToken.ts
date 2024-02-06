import jwt from "jsonwebtoken";

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
}
