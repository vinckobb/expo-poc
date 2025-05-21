import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import { RouteService } from "../../../service/RouteService";
import {
  RoutesListScreen as View,
  RoutesListViewModel as ViewModel,
  Action,
  Params,
} from "../../../screens/Transport Routes/RoutesList";

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

export type { Action as RoutesListAction };

export const RoutesListScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) =>
    new ViewModel(params.params, onAction, params.deps.routeService),
  (controller, action) => controller.handleRoutesListActionAction(action)
);
