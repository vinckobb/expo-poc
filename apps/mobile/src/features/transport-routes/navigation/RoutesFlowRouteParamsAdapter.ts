import * as FlowType from "./types/flowTypes";

const validateRouteDetailsParams = (input: unknown) => {
  const result =
    FlowType.ParamSchemas[FlowType.Screens.ROUTE_DETAILS].safeParse(input);
  if (!result.success) {
    throw new Error(`Invalid RouteDetailsParams: ${result.error.message}`);
  }
  return result.data;
};

export const ParamsAdapter: FlowType.ParamsAdapterMap = {
  [FlowType.Screens.ROUTES_LIST]: FlowType.NO_PARAMS,
  [FlowType.Screens.ROUTE_DETAILS]: validateRouteDetailsParams,
  [FlowType.Screens.FAVORITE_ROUTES]: FlowType.NO_PARAMS,
} as const;
