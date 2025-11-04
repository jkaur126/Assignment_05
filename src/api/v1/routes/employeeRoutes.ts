import { Router } from "express";
import * as controller from "../controllers/employeeController";
import { validateRequest } from "../middleware/validateRequest";
import { employeeSchema } from "../validation/employeeValidation";

/**
 * Router for employee endpoints.
 */
const router = Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.get("/", controller.getAllEmployees);
router.post("/", validateRequest(employeeSchema), controller.createEmployee);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve a specific employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully
 *       404:
 *         description: Employee not found
 *   put:
 *     summary: Update an existing employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.get("/:id", controller.getEmployeeById);
router.put("/:id", validateRequest(employeeSchema), controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

export default router;
