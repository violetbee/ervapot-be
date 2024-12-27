import { Request, Response } from "express";
import { generateToken, verifyToken } from "../../utils/token";
import { _login, _register } from "../../services/auth/auth.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const auth = await _login(email, password);

    const { accessToken, refreshToken } = auth;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      })
      .cookie("accessToken", accessToken, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      })
      .status(200)
      .json({
        message: "Giriş işlemi başarılı!",
        user: {
          id: auth.user.id,
          email: auth.user.email,
          name: auth.user.name,
          surname: auth.user.surname,
          accessToken,
          createdAt: Date.now(),
          expireDate: Date.now() + 1000 * 60 * 30,
        },
      });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await _register(req.body);

    return res.status(201).json({
      data: user,
      message: "Hesabınız başarıyla oluşturuldu.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers["authorization"]?.split(" ")[1];
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  try {
    const { id, email, name, surname } = verifyToken(refreshToken);
    const accessToken = generateToken({ id, email, name, surname });

    res.clearCookie("accessToken", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie("accessToken", accessToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return res.status(200).json({
      accessToken,
      createdAt: Date.now(),
      expireDate: Date.now() + 1000 * 60 * 30, // 30 minutes
    });
  } catch (error) {
    console.error("Invalid refresh token:", error);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    secure: process.env.NODE_ENV === "production",
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.status(200).json({ message: "Çıkış işlem başarılı!" });
};
