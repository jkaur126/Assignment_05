/**
 * Middleware for Joi validation.
 */

import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Validate request body against a schema.
 */
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message)
      });
      return;
    }
    next();
  };
};
