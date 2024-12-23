import { Request, Response } from "express";
import {
  _createOrder,
  _deleteOrder,
  _getAllOrders,
} from "../../services/order/order.service";
import { beautyApi } from "../../utils/thrower";
import { CustomRequest } from "../../middlewares/auth";

export const getAllOrders = async (req: CustomRequest, res: Response) => {
  const { pageSize, pageNumber } = req.query;

  try {
    const orders = await _getAllOrders({ pageSize, pageNumber });

    return beautyApi({
      res,
      data: orders,
      status: 200,
      message: "Siparişler başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    await _createOrder(req.body);

    return beautyApi({
      res,
      status: 201,
      message: "Sipariş başarıyla oluşturuldu.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await _deleteOrder(req.params);

    return beautyApi({
      res,
      status: 201,
      message: "Sipariş başarıyla silindi.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};
