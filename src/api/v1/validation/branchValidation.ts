import Joi from "joi";

/**
 * Joi schema for branch validation.
 */
export const branchSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).required()
});
