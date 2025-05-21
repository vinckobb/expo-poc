import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import { RouteService } from "../../../service/RouteService";
import {
  FavoriteRoutesScreen as View,
  FavoriteRoutesViewModel as ViewModel,
  Action,
  Params
} from "../../../screens/Transport Routes/FavoriteRoutes";

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

export type { Action as FavoriteRoutesAction };

export const FavoriteRoutesScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) => new ViewModel(params.deps?.routeService, onAction),
  (controller, action) => controller.handleFavoriteRoutesAction(action)
);
