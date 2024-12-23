import { Router } from "express";
import {
  getAllUsers,
  getMe,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user";
import { createEmployee } from "../controllers/employee";
import { validateData } from "../middlewares/validation";
import { createEmployeeType } from "../controllers/employee/schemes/index.scheme";

const router = Router();

router.get("/", getAllUsers);
router.get("/me", getMe);
router.post("/create", validateData(createEmployeeType), createEmployee);
router.get("/:id", getUserById);
router.put("/:id", validateData(createEmployeeType), updateUserById);
router.delete("/:id", deleteUserById);

export default router;
