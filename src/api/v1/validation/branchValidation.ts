import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           example: "b001"
 *         name:
 *           type: string
 *           example: "Downtown Winnipeg"
 *         address:
 *           type: string
 *           example: "123 Main Street, Winnipeg"
 *         phone:
 *           type: string
 *           example: "204-555-0101"
 *
 *     BranchInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Branch'
 *       example:
 *         name: "Downtown Winnipeg"
 *         address: "123 Main Street"
 *         phone: "204-555-0101"
 */

/**
 * Joi schema for branch validation.
 */
export const branchSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().required(),
  phone: Joi.string().min(10).required(),
});
