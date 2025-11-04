/**
 * Employee Service Layer
 * Provides Firestore CRUD operations for employees.
 */

import { Employee } from "../models/employeeModel";
import * as repo from "../repositories/firestoreRepository";

const COLLECTION = "employees";

/**
 * Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> =>
  repo.getAll<Employee>(COLLECTION);

/**
 * Get employee by ID.
 * @param {string} id
 * @returns {Promise<Employee | null>}
 */
export const getEmployeeById = async (
  id: string
): Promise<Employee | null> => repo.getById<Employee>(COLLECTION, id);

/**
 * Create a new employee.
 * @param {Employee} data
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (data: Employee): Promise<Employee> =>
  repo.create<Employee>(COLLECTION, data);

/**
 * Update employee.
 * @param {string} id
 * @param {Partial<Employee>} data
 * @returns {Promise<Employee | null>}
 */
export const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<Employee | null> => repo.update<Employee>(COLLECTION, id, data);

/**
 * Delete employee.
 * @param {string} id
 * @returns {Promise<boolean>}
 */
export const deleteEmployee = async (id: string): Promise<boolean> =>
  repo.remove(COLLECTION, id);
