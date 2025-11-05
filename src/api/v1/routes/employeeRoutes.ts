import { Router, Request, Response } from "express";
import * as controller from "../controllers/employeeController";
import { validateRequest } from "../middleware/validateRequest";
import { employeeSchema } from "../validation/employeeValidation";

/**
 * @fileoverview Employee routes for CRUD operations.
 * Includes inline OpenAPI documentation and TypeScript annotations.
 */

const router: Router = Router();

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Retrieve all employees
 *     description: Returns a list of all employee records stored in Firestore.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Successfully retrieved all employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Add a new employee
 *     description: Creates a new employee record and stores it in Firestore.
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       201:
 *         description: Employee successfully created.
 *       400:
 *         description: Validation error.
 */
router.get("/", (req: Request, res: Response) => controller.getAllEmployees(req, res));
router.post("/", validateRequest(employeeSchema), (req: Request, res: Response) =>
  controller.createEmployee(req, res)
);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Retrieve a specific employee by ID
 *     description: Fetches a single employee record from Firestore using its ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique employee ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found.
 *
 *   put:
 *     summary: Update an existing employee by ID
 *     description: Updates employee information in Firestore using their unique ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Employee not found.
 *
 *   delete:
 *     summary: Delete an employee by ID
 *     description: Removes an employee record from Firestore by ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully.
 *       404:
 *         description: Employee not found.
 */
router.get("/:id", (req: Request, res: Response) => controller.getEmployeeById(req, res));
router.put("/:id", validateRequest(employeeSchema), (req: Request, res: Response) =>
  controller.updateEmployee(req, res)
);
router.delete("/:id", (req: Request, res: Response) => controller.deleteEmployee(req, res));

export default router;
