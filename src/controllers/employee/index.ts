import type { Request, Response } from "express";

import { beautyApi } from "../../utils/thrower";
import {
  _createEmployee,
  _deleteEmployeeById,
  _getAllEmployees,
  _getEmployeeById,
  _updateEmployeeById,
} from "../../services/employee/employee.service";
import { CreateEmployeeScheme } from "./schemes/index.scheme";

export const getAllEmployees = async (req: Request, res: Response) => {
  const { pageSize, pageNumber } = req.query;

  try {
    const employees = await _getAllEmployees({ pageSize, pageNumber });

    return beautyApi({
      res,
      data: employees,
      status: 200,
      message: "Çalışanlar başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, status: 500, error });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const data = req.body as CreateEmployeeScheme;

  try {
    await _createEmployee(data);
    return beautyApi({
      res,
      status: 201,
      message: "Çalışan başarıyla oluşturuldu.",
    });
  } catch (error) {
    beautyApi({ res, status: 500, error });
  }
};

export const updateEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await _updateEmployeeById(id as string, data);

    return beautyApi({
      res,
      message: "Çalışan başarıyla güncellendi.",
      status: 200,
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const stokById = await _getEmployeeById(id);

    return beautyApi({
      res,
      data: stokById,
      status: 200,
      message: "Çalışan başarıyla getirildi.",
    });
  } catch (error) {
    return beautyApi({ res, error, status: 500 });
  }
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await _deleteEmployeeById(id);
    return beautyApi({
      res,
      message: "Çalışan başarıyla silindi",
      status: 200,
    });
  } catch (error) {
    return beautyApi({
      res,
      error: { message: "Çalışan silinirken bir hata oluştu." },
      status: 500,
    });
  }
};
