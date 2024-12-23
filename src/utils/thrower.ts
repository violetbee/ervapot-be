import { Response } from "express";

export const beautyApi = ({
  res,
  message,
  status,
  error,
  data,
}: {
  res: Response;
  message?: string;
  status: number;
  error?: any;
  data?: any;
}) => {
  return res.status(status).json({
    result: data,
    [error ? "error" : "message"]: error?.message || message,
    status: error ? "fail" : "success",
  });
};
