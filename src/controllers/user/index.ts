import { Request, Response } from "express";
import {
  _deleteUserById,
  _getAllUsers,
  _getUserById,
  _updateUserById,
} from "../../services/user/user.service";
import { CustomRequest } from "../../middlewares/auth";
import { beautyApi } from "../../utils/thrower";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await _getAllUsers();
    return res.status(200).json({
      data: users,
      message: "Kullanıcılar başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    const user = await _getUserById(id);
    return res.status(200).json({
      data: user,
      message: "Kullanıcı başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getMe = async (req: CustomRequest, res: Response) => {
  const { id } = req.user!;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    const user = await _getUserById(id);
    return res.status(200).json({
      data: user,
      message: "Kullanıcı başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    const user = await _updateUserById(id, req.body);
    return beautyApi({
      res,
      status: 201,
      message: "Çalışan başarıyla güncellendi.",
    });
  } catch (error) {
    beautyApi({ res, status: 500, error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "ID parametresi boş olamaz.",
    });
  }

  try {
    await _deleteUserById(id);
    return beautyApi({
      res,
      status: 201,
      message: "Çalışan başarıyla silindi.",
    });
  } catch (error) {
    beautyApi({ res, status: 500, error });
  }
};
