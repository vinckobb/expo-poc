export const RoutesScreens = {
  ROUTES_LIST: "RoutesList",
  ROUTE_DETAILS: "RouteDetails",
  FAVORITE_ROUTES: "FavoriteRoutes"
} as const;

export type RoutesScreenName = typeof RoutesScreens[keyof typeof RoutesScreens];