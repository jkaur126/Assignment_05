/**
 * Employee Controller
 * Handles HTTP requests for employee resources.
 */

import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";

/**
 * Retrieve all employees.
 */
export const getAllEmployees = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(successResponse("All employees retrieved", employees));
  } catch (err) {
    res.status(500).json(errorResponse("Failed to fetch employees", err));
  }
};

/**
 * Retrieve employee by ID.
 */
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }
    res.json(successResponse("Employee retrieved", employee));
  } catch (err) {
    res.status(500).json(errorResponse("Error fetching employee", err));
  }
};

/**
 * Create a new employee.
 */
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEmp = await employeeService.createEmployee(req.body);
    res.status(201).json(successResponse("Employee created", newEmp));
  } catch (err) {
    res.status(500).json(errorResponse("Error creating employee", err));
  }
};

/**
 * Update an existing employee.
 */
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await employeeService.updateEmployee(req.params.id, req.body);
    if (!updated) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }
    res.json(successResponse("Employee updated", updated));
  } catch (err) {
    res.status(500).json(errorResponse("Error updating employee", err));
  }
};

/**
 * Delete employee by ID.
 */
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await employeeService.deleteEmployee(req.params.id);
    if (!success) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }
    res.json(successResponse("Employee deleted"));
  } catch (err) {
    res.status(500).json(errorResponse("Error deleting employee", err));
  }
};
