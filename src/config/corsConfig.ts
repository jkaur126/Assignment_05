/**
 * @fileoverview Advanced CORS configuration for secure API access control.
 * Provides strict production rules and relaxed development settings.
 */

import cors, { CorsOptions } from "cors";

/**
 * Generates a CORS configuration based on environment.
 * @returns Express middleware with configured CORS options
 */
export const getCorsConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Relaxed CORS options for local development and testing.
   */
  const devCorsOptions: CorsOptions = {
    origin: ["http://localhost:5173"], // Local frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies for testing
    optionsSuccessStatus: 200,
  };

  /**
   * Strict CORS options for production environment.
   * Only allow requests from trusted production domains.
   */
  const prodCorsOptions: CorsOptions = {
    origin: [
      "https://your-gh-pages-site.github.io", 
      "https://pixell-river-financial.ca", 
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, 
    maxAge: 600, 
  };

  console.log(
    `CORS running in ${isDevelopment ? "development" : "production"} mode`
  );

  return cors(isDevelopment ? devCorsOptions : prodCorsOptions);
};
