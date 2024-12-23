import type { Request, Response } from "express";
import {
  _createStock,
  _deleteStockById,
  _getAllStocks,
  _getStockById,
  _updateStockById,
} from "../../services/stock/stock.service";
import { beautyApi } from "../../utils/thrower";

export const getAllStocks = async (req: Request, res: Response) => {
  const { pageSize, pageNumber } = req.query;

  try {
    const stocks = await _getAllStocks({ pageSize, pageNumber });

    return beautyApi({
      res,
      data: stocks,
      status: 200,
      message: "Stoklar başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};

export const createStock = async (req: Request, res: Response) => {
  const data = req.body;

  const { balance } = data;

  try {
    await _createStock(data);
    return beautyApi({
      res,
      status: 201,
      message: balance
        ? "Stok çıkışı başarıyla yapıldı."
        : "Stok başarıyla oluşturuldu.",
    });
  } catch (error) {
    beautyApi({ res, status: 500, error });
  }
};

export const updateStockById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await _updateStockById(id as string, data);

    return beautyApi({
      res,
      message: "Stok başarıyla güncellendi.",
      status: 200,
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const getStockById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const stokById = await _getStockById(id);

    return beautyApi({
      res,
      data: stokById,
      status: 200,
      message: "Stok başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const deleteStockById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await _deleteStockById(id);
    return beautyApi({ res, message: "Stok başarıyla silindi", status: 200 });
  } catch (error) {
    return beautyApi({
      res,
      error: { message: "Stok silinirken bir hata oluştu." },
      status: 500,
    });
  }
};
