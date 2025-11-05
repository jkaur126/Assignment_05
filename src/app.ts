/**
 * @fileoverview Express app setup with advanced Helmet, CORS, and Swagger configuration
 * for API security, documentation, and logging.
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

/**
 * Apply Helmet security middleware before other middlewares.
 * This helps secure HTTP headers and mitigate common attacks.
 */
app.use(getHelmetConfig());

/**
 * Logging and JSON parsing middleware.
 */
app.use(morgan("combined"));
app.use(express.json());

/**
 * Apply centralized CORS configuration.
 * This dynamically adjusts based on NODE_ENV (development/production).
 */
app.use(getCorsConfig());

/**
 * Swagger UI setup for interactive API documentation.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Health check endpoint for uptime and monitoring.
 */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).send("Server is healthy");
});

/**
 * Main API routes.
 */
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
