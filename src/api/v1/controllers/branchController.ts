/**
 * Branch Controller
 * Handles HTTP requests for branch resources.
 */

import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { successResponse, errorResponse } from "../models/responseModel";

/**
 * Retrieve all branches.
 */
export const getAllBranches = async (_req: Request, res: Response): Promise<void> => {
  try {
    const branches = await branchService.getAllBranches();
    res.json(successResponse("All branches retrieved", branches));
  } catch (err) {
    res.status(500).json(errorResponse("Failed to fetch branches", err));
  }
};

/**
 * Retrieve branch by ID.
 */
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const branch = await branchService.getBranchById(req.params.id);
    if (!branch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }
    res.json(successResponse("Branch retrieved", branch));
  } catch (err) {
    res.status(500).json(errorResponse("Error fetching branch", err));
  }
};

/**
 * Create a new branch.
 */
export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBranch = await branchService.createBranch(req.body);
    res.status(201).json(successResponse("Branch created", newBranch));
  } catch (err) {
    res.status(500).json(errorResponse("Error creating branch", err));
  }
};

/**
 * Update an existing branch.
 */
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await branchService.updateBranch(req.params.id, req.body);
    if (!updated) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }
    res.json(successResponse("Branch updated", updated));
  } catch (err) {
    res.status(500).json(errorResponse("Error updating branch", err));
  }
};

/**
 * Delete branch by ID.
 */
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await branchService.deleteBranch(req.params.id);
    if (!success) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }
    res.json(successResponse("Branch deleted"));
  } catch (err) {
    res.status(500).json(errorResponse("Error deleting branch", err));
  }
};
