# NICL Mock Server

A flexible TypeScript-based mock server built with Express for API simulation and rapid prototyping.

Both the host (`http://localhost:3000`) and the base API path (`/api`) are configurable. You can modify these settings in the `src/mock-config.ts` file to suit your environment or project requirements.

## Project Architecture

### Core Structure

- `src/server.ts`: Entry point that initializes Express server, registers middleware and routes
- `src/router.ts`: Central router that collects and registers all route groups
- `src/mock-config.ts`: Configuration for server settings and logging behavior
- `src/utils/logger.ts`: Logging utility for requests/responses and application events

### Routing System

The mock server uses a flexible, modular routing architecture:

1. **Route Groups**: Routes are organized in logical groups (e.g., users, transport-routes)
2. **Route Definition**: Each route has a method, path, and handler

#### Adding New Route Groups

1. Create a new file in the `src/routes/` directory (e.g., `products.ts`)
2. Define routes using the `Route` interface
3. Register the route group in `src/router.ts`

Example of a route group:

```typescript
import { Route } from "../types/route";

export const routes: Route[] = [
  {
    method: "get",
    path: "/products",
    handler: (req, res) => {
      res.status(200).json([{ id: 1, name: "Product 1" }]);
    },
  },
];
```

Then update the router:

```typescript
import { routes as productsRoutes } from "./routes/products";
// ...other imports

export const routes: Route[] = [
  ...usersRoutes,
  ...transportRoutes,
  ...productsRoutes,
];
```

### Implementation Patterns

The architecture supports multiple implementation approaches:

1. **Independent Routes**: Each route with its own handler and data
2. **Shared Logic**: Route groups with common functionality and shared data sources
3. **Hybrid Approach**: Mix of shared and independent logic based on requirements

For shared data, you can create a data file in the route group directory and import it in route handlers.

## Logging System

The server includes a configurable logging system for requests and responses.

### Logging Configuration

Configure logging behavior in `src/mock-config.ts`:

```typescript
logging: {
  enabled: true,           // Enable/disable all logging
  usePrefix: false,        // Show prefixes for log types
  requestDetails: false,   // Show request query/body details
  logResponse: false,      // Enable/disable response logging
  responseTime: true,      // Show response time in milliseconds
  responseLevel: "none"    // Response detail level: none, brief, or full
}
```

### Logging Features

- **Request Logging**: Method, URL, query parameters, and request body
- **Response Logging**: Status code, URL, response time, and response data
- **Response Detail Levels**:
  - `none`: Only status and URL
  - `brief`: Type and size information
  - `full`: Complete response data
- **General Logging**: Info, warning, and error messages

## Technologies

- TypeScript
- Express
- Node.js
- ES modules
