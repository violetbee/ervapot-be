import { Router } from "express";
import { validateData } from "../middlewares/validation";

import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product";
import { createProductType } from "../controllers/product/schemes/index.scheme";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.put("/:id", validateData(createProductType), updateProductById);
router.post("/create", validateData(createProductType), createProduct);

export default router;
