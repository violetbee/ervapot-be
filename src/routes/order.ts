import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders } from "../controllers/order";

const router = Router();

router.get("/", getAllOrders);
router.post("/create", createOrder);
router.delete("/:id", deleteOrder);

export default router;
