/**
 * Express app setup with advanced Helmet configuration for API security.
 */

import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet, { HelmetOptions } from "helmet";
import cors from "cors";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Application = express();

// Middleware 
app.use(express.json());
app.use(morgan("combined"));

/**
 * Custom Helmet configuration
 * Enables default protections and adds API-friendly policies.
 */
const helmetConfig: HelmetOptions = {
  crossOriginResourcePolicy: { policy: "same-origin" },
  referrerPolicy: { policy: "no-referrer" },
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "object-src": ["'none'"],
      "cross-origin-opener-policy": ["same-origin"]
    }
  }
};

// Apply Helmet security headers
app.use(helmet(helmetConfig));

/**
 * Placeholder for CORS 
 * — Will be customized later.
 */
app.use(cors());

// Health Endpoint 
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).send("Server is healthy");
});

// Routes 
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
