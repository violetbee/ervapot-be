import { NextFunction, Response } from "express";
import { prisma } from "../utils/db";
import { CustomRequest } from "./auth";

export const isAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "Bu sayfaya erişim yetkiniz bulunmamaktadır.",
    });
  }

  next();
};
