import { Router } from "express";
import { validateData } from "../middlewares/validation";

import {
  createLedgerType,
  createTransactionType,
} from "../controllers/ledger/schemes/index.scheme";
import {
  createLedger,
  createTransaction,
  deleteTransaction,
  getAllLedgers,
  getAllTransactions,
  getLedgerById,
  removeLedgerById,
  updateLedgerById,
} from "../controllers/ledger";

const router = Router();

router.get("/", getAllLedgers);
router.get("/:id", getLedgerById);
router.delete("/:id", removeLedgerById);
router.put("/:id", updateLedgerById);
router.post("/create", validateData(createLedgerType), createLedger);
router.post(
  "/transaction/create",
  validateData(createTransactionType),
  createTransaction
);
router.get("/transaction/:id", getAllTransactions);
router.delete("/transaction/:id", deleteTransaction);

export default router;
