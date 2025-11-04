import Joi from "joi";

/**
 * Joi schema for employee validation.
 */
export const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  branchId: Joi.string().required()
});
