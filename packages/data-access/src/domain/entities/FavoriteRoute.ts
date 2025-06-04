import { Route } from "./Route";

export interface FavoriteRoute {
  id: string;
  routeId: string;
  position: number;
  route: Route;
}
