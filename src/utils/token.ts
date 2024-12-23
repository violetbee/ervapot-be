import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../routes/types";

export const generateToken = (decoder: JwtPayload, type = "access") => {
  return jwt.sign(decoder, process.env.JWT_SECRET!, {
    expiresIn: type === "access" ? "120d" : "365d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtUser | JwtPayload;
};
