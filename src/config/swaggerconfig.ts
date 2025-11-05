import swaggerJSDoc from "swagger-jsdoc";

/**
 * Swagger configuration for OpenAPI documentation
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "PiXELL-River Financial API",
      version: "1.0.0",
      description:
        "API documentation for Employees and Branches (Express + TypeScript + Firestore).",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
  },
  // Path patterns for inline OpenAPI docs
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};

// Generate Swagger specification
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
