import { Router, Request, Response } from "express";
import * as controller from "../controllers/branchController";

/**
 * @fileoverview Branch routes for CRUD operations.
 * Contains inline OpenAPI documentation and TypeScript annotations.
 */

const router: Router = Router();

/**
 * @openapi
 * /api/v1/branches:
 *   get:
 *     summary: Retrieve all branches
 *     description: Returns a list of all branches stored in Firestore.
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: List of branches retrieved successfully.
 *
 *   post:
 *     summary: Add a new branch
 *     description: Creates a new branch record and stores it in Firestore.
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchInput'
 *     responses:
 *       201:
 *         description: Branch successfully created.
 *       400:
 *         description: Validation error.
 */
router.get("/", (req: Request, res: Response) => controller.getAllBranches(req, res));
router.post("/", (req: Request, res: Response) => controller.createBranch(req, res));

/**
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Retrieve a branch by ID
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to retrieve.
 *     responses:
 *       200:
 *         description: Branch retrieved successfully.
 *       404:
 *         description: Branch not found.
 *
 *   put:
 *     summary: Update a branch by ID
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BranchInput'
 *     responses:
 *       200:
 *         description: Branch updated successfully.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Branch not found.
 *
 *   delete:
 *     summary: Delete a branch by ID
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID to delete.
 *     responses:
 *       200:
 *         description: Branch deleted successfully.
 *       404:
 *         description: Branch not found.
 */
router.get("/:id", (req: Request, res: Response) => controller.getBranchById(req, res));
router.put("/:id", (req: Request, res: Response) => controller.updateBranch(req, res));
router.delete("/:id", (req: Request, res: Response) => controller.deleteBranch(req, res));

export default router;
