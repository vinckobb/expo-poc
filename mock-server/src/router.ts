import { routes as usersRoutes } from "./routes/users";
import { routes as transportRoutes } from "./routes/transport-routes";
import { Route } from "./types/route";

export const routes: Route[] = [...usersRoutes, ...transportRoutes];
