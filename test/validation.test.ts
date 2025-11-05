/**
 * @fileoverview Unit tests for Joi validation schema (Assignment 3).
 */

import { ValidationError } from "joi";
import { employeeSchema } from "../src/api/v1/validation/employeeValidation";

/**
 * Tests the employee Joi validation schema.
 */
describe("Employee Validation Schema - Assignment 3", (): void => {
  it("should validate correct employee data", (): void => {
    const { error }: { error?: ValidationError } = employeeSchema.validate({
      name: "John Doe",
      position: "Developer",
      department: "IT",
      email: "john@pixell.com",
      phone: "2045550000",
      branchId: "1"
    });
    expect(error).toBeUndefined();
  });

  it("should reject invalid email address", (): void => {
    const { error }: { error?: ValidationError } = employeeSchema.validate({
      name: "Bad Email",
      position: "Tester",
      department: "QA",
      email: "invalidemail",
      phone: "2045550000",
      branchId: "1"
    });
    expect(error).toBeDefined();
  });
});
