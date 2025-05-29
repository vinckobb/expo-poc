import { z } from "zod";

export const RouteSchema = z.object({
  id: z.string(),
  number: z.string(),
  name: z.string(),
  startPoint: z.string(),
  endPoint: z.string(),
  color: z.string(),
});

export const FavoriteRouteResponseSchema = z.object({
  id: z.string(),
  routeId: z.string(),
  position: z.number(),
  route: RouteSchema,
});

export const GetRoutesResponseSchema = z.object({
  routes: z.array(RouteSchema),
});

export const GetFavoriteRoutesResponseSchema = z.object({
  favorites: z.array(FavoriteRouteResponseSchema),
});

export const AddFavoriteRequestSchema = z.object({
  routeId: z.string(),
});

export const ChangePositionRequestSchema = z.object({
  position: z.number(),
});

export const GetFavoriteRoutesQueryParamsSchema = z.object({
  sortBy: z.enum(["number", "name", "custom"]).optional(),
  searchText: z.string().optional(),
  filterByNumber: z.string().optional(),
  filterByName: z.string().optional(),
});

export type RouteDTO = z.infer<typeof RouteSchema>;
export type FavoriteRouteResponseDTO = z.infer<
  typeof FavoriteRouteResponseSchema
>;
export type GetRoutesResponseDTO = z.infer<typeof GetRoutesResponseSchema>;
export type GetFavoriteRoutesResponseDTO = z.infer<
  typeof GetFavoriteRoutesResponseSchema
>;
export type AddFavoriteRequestDTO = z.infer<typeof AddFavoriteRequestSchema>;
export type ChangePositionRequestDTO = z.infer<
  typeof ChangePositionRequestSchema
>;
export type GetFavoriteRoutesQueryParamsDTO = z.infer<
  typeof GetFavoriteRoutesQueryParamsSchema
>;
