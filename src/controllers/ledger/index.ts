import { Request, Response } from "express";

import { CustomRequest } from "../../middlewares/auth";
import { beautyApi } from "../../utils/thrower";
import {
  _createLedger,
  _createTransaction,
  _deleteTransaction,
  _getAllLedgers,
  _getAllTransactions,
  _getLedgerById,
  _removeLedgerById,
  _updateLedgerById,
} from "../../services/ledger/ledger.service";
import { CreateLedgerScheme } from "./schemes/index.scheme";

export const getAllLedgers = async (req: CustomRequest, res: Response) => {
  const { pageSize, pageNumber, ledgerType } = req.query;

  try {
    const ledgers = await _getAllLedgers({
      pageSize,
      pageNumber,
      ledgerType,
    });
    return beautyApi({
      res,
      data: ledgers,
      message: "Cariler başarıyla getirildi.",
      status: 200,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getLedgerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ledger = await _getLedgerById(id);
    return beautyApi({
      res,
      data: ledger,
      message: "Cari başarıyla getirildi",
      status: 200,
    });
  } catch (error: any) {
    return beautyApi({
      res,
      error,
      status: 500,
    });
  }
};

export const createLedger = async (req: CustomRequest, res: Response) => {
  const data = req.body as CreateLedgerScheme;

  try {
    await _createLedger(data);
    return beautyApi({
      res,
      message: "Cari başarıyla oluşturuldu.",
      status: 201,
    });
  } catch (error: any) {
    return beautyApi({
      res,
      error: {
        message: "Cari oluşturulurken hata oluştu.",
      },
      status: 403,
    });
  }
};

export const removeLedgerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await _removeLedgerById(id);
    return beautyApi({
      res,
      message: "Cari başarıyla silindi.",
      status: 200,
    });
  } catch (error: any) {
    return beautyApi({
      res,
      error: {
        message: "İlgili cari bulunamadı.",
      },
      status: 403,
    });
  }
};

export const updateLedgerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await _updateLedgerById(id, data);
    return beautyApi({
      res,
      message: "Cari başarıyla güncellendi",
      status: 200,
    });
  } catch (error: any) {
    return beautyApi({
      res,
      error: {
        message: "Cari silinirken hata oluştu.",
      },
      status: 403,
    });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    await _createTransaction(data);
    return beautyApi({
      res,
      message: "Kayıt başarıyla oluşturuldu",
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return beautyApi({
      res,
      error: {
        message: "Kayıt oluşturulurken hata oluştu.",
      },
      status: 403,
    });
  }
};

export const getAllTransactions = async (req: Request, res: Response) => {
  const { pageSize, pageNumber } = req.query;
  const { id } = req.params;

  try {
    const data = await _getAllTransactions({
      pageSize,
      pageNumber,
      id,
    });

    return beautyApi({
      res,
      data,
      status: 200,
      message: "Kayıtlar başarıyla getirildi.",
    });
  } catch (err) {
    return beautyApi({
      res,
      error: {
        message: "Kayıtlar getirilirken bir hata oluştu.",
      },
      status: 403,
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await _deleteTransaction(id);
    return beautyApi({
      res,
      status: 200,
      message: "Kayıt başarıyla silindi.",
    });
  } catch (e) {
    return beautyApi({
      res,
      error: {
        message: "Kayıt silinirken bir hata oluştu.",
      },
      status: 403,
    });
  }
};
