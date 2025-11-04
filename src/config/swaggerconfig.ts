/**
 * Swagger/OpenAPI configuration.
 */
import swaggerJSDoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

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
  // Path to the route files containing OpenAPI annotations
  apis: ["./src/api/v1/routes/*.ts"]
};

/**
 * @description Generated OpenAPI specification.
 */
export const swaggerSpec = swaggerJSDoc(options);

