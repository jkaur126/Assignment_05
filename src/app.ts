/**
 * Express app setup with advanced Helmet configuration for API security.
 */
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import helmet, { HelmetOptions } from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swaggerconfig";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

const app: Application = express();

// ===== Middleware =====
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
 * Custom CORS configuration for controlled API access.
 * Allows requests from your local front-end and GitHub Pages deployment.
 */
const corsOptions = {
  origin: ["http://localhost:5173", "https://your-gh-pages-site.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204
};

// Apply CORS with custom options
app.use(cors(corsOptions));

/**
 * Swagger UI setup for API documentation.
 * Access your documentation at: http://localhost:3000/api-docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Health endpoint to confirm the API is running.
 */
app.get("/health", (_req: Request, res: Response): void => {
  res.status(200).send("Server is healthy");
});

// Routes 
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

export default app;
