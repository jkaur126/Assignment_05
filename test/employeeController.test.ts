/**
 * @fileoverview Unit tests for Employee Controller methods.
 * @module test/employeeController.test
 */

import { Request, Response } from "express";
import * as controller from "../src/api/v1/controllers/employeeController";
import * as service from "../src/api/v1/services/employeeService";
import { successResponse, errorResponse } from "../src/api/v1/models/responseModel";

/**
 * Mock Express request and response objects.
 */
const mockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("Employee Controller Unit Tests", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  /**
   * Tests GET /api/v1/employees (getAllEmployees)
   */
  it("should return all employees successfully", async (): Promise<void> => {
    const req = {} as Request;
    const res = mockResponse();
    const employees = [{ id: 1, name: "Alice" }];

    jest.spyOn(service, "getAllEmployees").mockResolvedValue(employees as any);

    await controller.getAllEmployees(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("All employees retrieved", employees));
  });

  /**
   * Tests GET /api/v1/employees/:id (getEmployeeById)
   */
  it("should return employee by ID", async (): Promise<void> => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();
    const employee = { id: 1, name: "Alice" };

    jest.spyOn(service, "getEmployeeById").mockResolvedValue(employee as any);

    await controller.getEmployeeById(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Employee retrieved", employee));
  });

  /**
   * Tests POST /api/v1/employees (createEmployee)
   */
  it("should create new employee", async (): Promise<void> => {
    const req = { body: { name: "Bob" } } as Request;
    const res = mockResponse();
    const newEmployee = { id: 2, name: "Bob" };

    jest.spyOn(service, "createEmployee").mockResolvedValue(newEmployee as any);

    await controller.createEmployee(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(successResponse("Employee created", newEmployee));
  });

  /**
   * Tests PUT /api/v1/employees/:id (updateEmployee)
   */
  it("should update existing employee", async (): Promise<void> => {
    const req = { params: { id: "1" }, body: { position: "Manager" } } as unknown as Request;
    const res = mockResponse();
    const updated = { id: 1, position: "Manager" };

    jest.spyOn(service, "updateEmployee").mockResolvedValue(updated as any);

    await controller.updateEmployee(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Employee updated", updated));
  });

  /**
   * Tests DELETE /api/v1/employees/:id (deleteEmployee)
   */
  it("should delete employee successfully", async (): Promise<void> => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = mockResponse();

    jest.spyOn(service, "deleteEmployee").mockResolvedValue(true);

    await controller.deleteEmployee(req, res);
    expect(res.json).toHaveBeenCalledWith(successResponse("Employee deleted"));
  });

  /**
   * Tests error handling in controller
   */
  it("should handle service errors gracefully", async (): Promise<void> => {
    const req = {} as Request;
    const res = mockResponse();

    jest.spyOn(service, "getAllEmployees").mockRejectedValue(new Error("DB error"));

    await controller.getAllEmployees(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorResponse("Failed to fetch employees", expect.any(Error)));
  });
});
