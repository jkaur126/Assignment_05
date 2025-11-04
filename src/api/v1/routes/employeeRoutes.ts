import { Router } from "express";
import * as controller from "../controllers/employeeController";
import { validateRequest } from "../middleware/validateRequest";
import { employeeSchema } from "../validation/employeeValidation";

/**
 * Router for employee endpoints.
 */
const router = Router();

router.get("/", controller.getAllEmployees);
router.get("/:id", controller.getEmployeeById);
router.post("/", validateRequest(employeeSchema), controller.createEmployee);
router.put("/:id", validateRequest(employeeSchema), controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

export default router;
