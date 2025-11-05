/**
 * @fileoverview Swagger/OpenAPI configuration for PiXELL-River Financial API.
 * Defines reusable specification metadata and scanning paths for inline documentation.
 */

import swaggerJSDoc, { Options } from "swagger-jsdoc";

/**
 * @description Configuration options for generating the OpenAPI specification.
 */
const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PiXELL-River Financial API",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for the Employee & Branch Management system."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server"
      }
    ]
  },

  /**
   * @description
   * Paths to files containing inline @openapi annotations.
   * Includes both route files (endpoints) and validation files (schema components).
   */
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"]
};

/**
 * @description Generated OpenAPI specification object for use in Swagger UI.
 */
export const swaggerSpec = swaggerJSDoc(options);
