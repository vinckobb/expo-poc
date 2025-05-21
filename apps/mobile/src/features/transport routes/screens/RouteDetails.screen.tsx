import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import { RouteService } from "../../../service/RouteService";
import {
  RouteDetailsScreen as View,
  RouteDetailsViewModel as ViewModel,
  Action,
  Params,
} from "../../../screens/Transport Routes/RouteDetails";

import { Controller } from "../navigation/types/flowTypes";

type Dependencies = {
  routeService: RouteService;
  analytics?: object;
  featureFlags?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Params;
  deps: Dependencies;
  config?: Config;
};

export type { Action as RouteDetailsAction };

export const RouteDetailScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) =>
    new ViewModel(params.params, onAction, params.deps.routeService),
  (controller, action) => controller.handleRouteDetailsAction(action)
);
