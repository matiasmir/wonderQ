export const postMessage = {
  tags: ["Messaging"],
  summary: "Save a message and returns ID",
  description: "In this endpoint you can add messages to the queue ",
  operationId: "postMessage",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              nullable: false,
              description: "Required message Field",
            },
          },
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Response when a message has been saved succesfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              messageId: {
                type: "string",
                description: "MD5 Hash",
              },
            },
          },
        },
      },
    },
    "400": {
      description:
        "Bad Request - If the message is empty you'll receive this error.",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              statusCode: {
                type: "number",
                description: "Error Code",
              },
              message: {
                type: "string",
                description: "Error Message",
              },
            },
          },
        },
      },
    },
  },
};
