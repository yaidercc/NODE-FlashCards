const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flashcard API",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/*.routes.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDocs = (app, port) => {
  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

module.exports = {
  swaggerDocs,
};
