import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Bug Reporter API",
      version: "1.0.0",
      description: "Schema and Route Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/**/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;