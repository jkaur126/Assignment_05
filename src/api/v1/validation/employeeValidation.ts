import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           example: Alice Johnson
 *         position:
 *           type: string
 *           example: Branch Manager
 *         department:
 *           type: string
 *           example: Management
 *         email:
 *           type: string
 *           format: email
 *           example: alice.johnson@pixell-river.com
 *         phone:
 *           type: string
 *           example: 604-555-0148
 *         branchId:
 *           type: string
 *           example: "1"
 */

/**
 * Joi schema for employee validation.
 * Ensures that request payloads for employee endpoints follow the defined structure.
 */
export const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  branchId: Joi.string().required()
});

