import type { Request, Response } from "express";

import { beautyApi } from "../../utils/thrower";
import {
  _createProduct,
  _deleteProductById,
  _getAllProducts,
  _getProductById,
  _updateProductById,
} from "../../services/product/product.service";

export const getAllProducts = async (req: Request, res: Response) => {
  const { pageSize, pageNumber } = req.query;

  try {
    const products = await _getAllProducts({ pageSize, pageNumber });

    return beautyApi({
      res,
      data: products,
      status: 200,
      message: "Ürünler başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    await _createProduct(data);
    return beautyApi({
      res,
      status: 201,
      message: "Ürün başarıyla oluşturuldu.",
    });
  } catch (error) {
    beautyApi({ res, status: 500, error });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await _updateProductById(id as string, data);

    return beautyApi({
      res,
      message: "Ürün başarıyla güncellendi.",
      status: 200,
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ÜrünById = await _getProductById(id);

    return beautyApi({
      res,
      data: ÜrünById,
      status: 200,
      message: "Ürün başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await _deleteProductById(id);
    return beautyApi({ res, message: "Ürün başarıyla silindi", status: 200 });
  } catch (error) {
    return beautyApi({
      res,
      error: { message: "Ürün silinirken bir hata oluştu." },
      status: 500,
    });
  }
};
