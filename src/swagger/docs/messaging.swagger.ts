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

export const processMessage = {
  tags: ["Messaging"],
  summary: "Process a message",
  description: "Process the message and removes it from the queue.",
  operationId: "processMessage",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              nullable: false,
              description: "Required message MD5 hash",
            },
          },
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Response when a message has been processed succesfully",
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
        "Bad Request - If the id is empty you'll receive this error.",
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
    "404": {
      description: "Not Found - Message not found in database.",
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

export const pollMessages = {
  tags: ["Messaging"],
  summary: "Poll messages",
  description:
    "Polls the ammount of messages required in the parameter, for example: /messages/poll/3 will poll 3 messages.",
  operationId: "pollMessages",
  parameters: [
    {
      in: "path",
      name: "number",
      description: "Ammount of messages to poll",
    },
  ],
  responses: {
    "200": {
      description: "Returns an array of messages",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              messageId: {
                type: "string",
                description: "MD5 Hash",
              },
              message: {
                type: "string",
                description: "Message",
              },
            },
          },
        },
      },
    },
  },
};
