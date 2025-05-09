import express from "express";
import cors from "cors";
import { routes } from "./router";
import { mockConfig } from "./mock-config";
import { logger } from "./utils/logger";

const app = express();
const PORT = mockConfig.port;
const apiBasePath = "/api";

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  logger.request(req.method, req.url, req.query, req.body);

  const originalSend = res.send;
  res.send = function (body) {
    const responseTime = Date.now() - startTime;

    let responseData;
    try {
      if (typeof body === "string") {
        responseData = JSON.parse(body);
      } else {
        responseData = body;
      }
    } catch (e) {
      responseData = body;
    }

    logger.response(res.statusCode, req.url, responseTime, responseData);

    return originalSend.call(this, body);
  };

  next();
});

// Routes
console.log(`Routes registered: -------------------------------------------`);
routes.forEach((route) => {
  const fullPath = `${apiBasePath}${route.path}`;

  switch (route.method.toLowerCase()) {
    case "get":
      app.get(fullPath, route.handler);
      break;
    case "post":
      app.post(fullPath, route.handler);
      break;
    case "put":
      app.put(fullPath, route.handler);
      break;
    case "delete":
      app.delete(fullPath, route.handler);
      break;
    case "patch":
      app.patch(fullPath, route.handler);
      break;
    default:
      logger.warn(`Unknown HTTP method: ${route.method} for route ${fullPath}`);
  }

  console.log(`${fullPath} [${route.method.toUpperCase()}]`);
});
console.log(`--------------------------------------------------------------`);

const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server running at ${mockConfig.baseUrl}:${mockConfig.port}`);
    logger.info(`API is available at http://localhost:${PORT}${apiBasePath}`);
    logger.info(
      `Request logging is ${
        mockConfig.logging.enabled ? "enabled" : "disabled"
      }`
    );
  });
};

startServer();
