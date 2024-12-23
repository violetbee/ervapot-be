import { Router } from "express";
import { validateData } from "../middlewares/validation";

import {
  createStock,
  deleteStockById,
  getAllStocks,
  getStockById,
  updateStockById,
} from "../controllers/stock";
import { createStockType } from "../controllers/stock/schemes/index.scheme";

const router = Router();

router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.delete("/:id", deleteStockById);
router.put("/:id", updateStockById);
router.post("/create", validateData(createStockType), createStock);

export default router;
