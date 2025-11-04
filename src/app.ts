/**
 * Express application setup.
 * Initializes middleware, routes, and a basic health check endpoint.
 */

import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Application = express();

// Global middleware
app.use(express.json());
app.use(morgan("combined"));

/**
 * Health check endpoint.
 */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).send("Server is healthy");
});

// API v1 routes
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
