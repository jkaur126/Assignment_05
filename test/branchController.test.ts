/**
 * @fileoverview Unit tests for Branch Controller methods.
 * @module test/branchController.test
 */

import { Request, Response } from "express";
import * as controller from "../src/api/v1/controllers/branchController";
import * as service from "../src/api/v1/services/branchService";
import { successResponse, errorResponse } from "../src/api/v1/models/responseModel";

/**
 * Creates a mock response object for Express.
 * @returns {Response} Mocked response object.
 */
const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Branch Controller Unit Tests", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  /**
   * Tests GET /api/v1/branches (getAllBranches)
   */
  it("should return all branches successfully", async (): Promise<void> => {
    const req = {} as Request;
    const res = mockResponse();
    const branches = [{ id: 1, name: "Main Branch" }];

    jest.spyOn(service, "getAllBranches").mockResolvedValue(branches as any);

    await controller.getAllBranches(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("All branches retrieved", branches));
  });

  /**
   * Tests GET /api/v1/branches/:id (getBranchById)
   */
  it("should return a branch by ID", async (): Promise<void> => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();
    const branch = { id: 1, name: "Main Branch" };

    jest.spyOn(service, "getBranchById").mockResolvedValue(branch as any);

    await controller.getBranchById(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Branch retrieved", branch));
  });

  /**
   * Tests POST /api/v1/branches (createBranch)
   */
  it("should create new branch successfully", async (): Promise<void> => {
    const req = { body: { name: "New Branch" } } as Request;
    const res = mockResponse();
    const newBranch = { id: 2, name: "New Branch" };

    jest.spyOn(service, "createBranch").mockResolvedValue(newBranch as any);

    await controller.createBranch(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(successResponse("Branch created", newBranch));
  });

  /**
   * Tests PUT /api/v1/branches/:id (updateBranch)
   */
  it("should update branch successfully", async (): Promise<void> => {
    const req = { params: { id: "1" }, body: { address: "Updated Address" } } as unknown as Request;
    const res = mockResponse();
    const updated = { id: 1, address: "Updated Address" };

    jest.spyOn(service, "updateBranch").mockResolvedValue(updated as any);

    await controller.updateBranch(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Branch updated", updated));
  });

  /**
   * Tests DELETE /api/v1/branches/:id (deleteBranch)
   */
  it("should delete branch successfully", async (): Promise<void> => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    jest.spyOn(service, "deleteBranch").mockResolvedValue(true);

    await controller.deleteBranch(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Branch deleted"));
  });

  /**
   * Tests error handling when service throws an error.
   */
  it("should handle errors gracefully", async (): Promise<void> => {
    const req = {} as Request;
    const res = mockResponse();

    jest.spyOn(service, "getAllBranches").mockRejectedValue(new Error("DB error"));

    await controller.getAllBranches(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorResponse("Failed to fetch branches", expect.any(Error)));
  });
});
