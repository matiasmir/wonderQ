import { postMessage } from "./docs/messaging.swagger";
export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "WonderQ Docs",
    description: "Documentation for the WonderQ API",
    termsOfService: "",
  },
  servers: [
    {
      url: "api.dev.wonderQ.com",
      description: "Dev server with test data",
    },
    {
      url: "api.wonderQ.com",
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "Messaging",
    },
  ],
  paths: {
    "/messaging": {
      post: postMessage,
    },
  },
};
