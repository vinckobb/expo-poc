import {
  RouteParamSchemas as ParamSchemas,
  RoutesParamList as ParamList,
} from "./types/paramList";

export function mapRouteDetailsParams(
  input: unknown
): ParamList["RouteDetails"] {
  const result = ParamSchemas["RouteDetails"].safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid RouteDetailsParams: ${result.error.message}`);
  }

  return result.data;
}

type ParamsAdapterMap = {
  [K in keyof ParamList]: (input: unknown) => ParamList[K];
};

export const ParamsAdapter: ParamsAdapterMap = {
  RouteDetails: (input) => {
    const result = ParamSchemas["RouteDetails"].safeParse(input);
    if (!result.success) {
      throw new Error(`Invalid RouteDetailsParams: ${result.error.message}`);
    }
    return result.data;
  },

  RoutesList: () => undefined,
  FavoriteRoutes: () => undefined,
};