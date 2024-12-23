import { Router } from "express";
import { validateData } from "../middlewares/validation";

import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
} from "../controllers/employee";
import { createEmployeeType } from "../controllers/employee/schemes/index.scheme";

const router = Router();

router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.delete("/:id", deleteEmployeeById);
router.put("/:id", updateEmployeeById);
router.post("/create", createEmployee);

export default router;
