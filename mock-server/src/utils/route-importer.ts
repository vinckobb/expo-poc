import fs from "fs";
import path from "path";
import { Route } from "../types/route";

/**
 * Universal route importer for a group
 * @param groupDir Absolute path to the group directory
 * @returns Array of routes
 */
export function importRoutes(groupDir: string): Route[] {
  const routeTypes = fs
    .readdirSync(groupDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== "index")
    .map((dirent) => dirent.name);

  const routes: Route[] = [];

  for (const routeType of routeTypes) {
    const routePath = path.join(groupDir, routeType, "index");
    try {
      const route = require(routePath);
      if (route.method && route.path && route.handler) {
        routes.push({
          method: route.method,
          path: route.path,
          handler: route.handler,
        });
      }
    } catch (err) {
      console.error(`Failed to import route: ${routePath}`, err);
    }
  }

  return routes;
}
