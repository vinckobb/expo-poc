import { z } from "zod";
import { RoutesScreens } from "./routesList";

// Param Schemas
const RoutesListParamsSchema = z.undefined();
const RouteDetailsParamsSchema = z.object({
  routeId: z.string().min(1),
});
const FavoriteRoutesParamsSchema = z.undefined();

// Params inferred Types
type RoutesListParams = z.infer<typeof RoutesListParamsSchema>;
type RouteDetailsParams = z.infer<typeof RouteDetailsParamsSchema>;
type FavoriteRoutesParams = z.infer<typeof FavoriteRoutesParamsSchema>;

export type RoutesParamList = {
  [RoutesScreens.ROUTES_LIST]: RoutesListParams;
  [RoutesScreens.ROUTE_DETAILS]: RouteDetailsParams;
  [RoutesScreens.FAVORITE_ROUTES]: FavoriteRoutesParams;
};

export const RouteParamSchemas = {
  [RoutesScreens.ROUTES_LIST]: RoutesListParamsSchema,
  [RoutesScreens.ROUTE_DETAILS]: RouteDetailsParamsSchema,
  [RoutesScreens.FAVORITE_ROUTES]: FavoriteRoutesParamsSchema,
};
