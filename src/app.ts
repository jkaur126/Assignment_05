/**
 * @fileoverview Express application setup for PiXELL-River Financial API.
 * Includes Helmet, CORS, Swagger (OpenAPI), logging, and structured routing.
 */

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swaggerconfig";
import { getHelmetConfig } from "./config/helmetConfig";
import { getCorsConfig } from "./config/corsConfig";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// ===== Load environment variables =====
dotenv.config();

// ===== Initialize Express app =====
const app: Application = express();

// ===== Middleware Setup =====
app.use(express.json());               // Parse incoming JSON
app.use(morgan("combined"));           // HTTP request logging
app.use(getHelmetConfig());            // Apply Helmet security headers
app.use(getCorsConfig());              // Apply advanced CORS configuration

// ===== Swagger UI Setup =====
/**
 * Swagger UI endpoint for API documentation.
 * Accessible at: http://localhost:3000/api-docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== Health Check Endpoint =====
/**
 * @route GET /health
 * @description Simple health check endpoint for uptime verification.
 * @returns {string} Server status message.
 */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).send("Server is healthy");
});

// ===== API Routes =====
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// ===== Export the Express app =====
export default app;
