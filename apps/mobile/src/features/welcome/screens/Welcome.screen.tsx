import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  Welcome as View,
  WelcomeViewModel as ViewModel,
  Action,
  Params,
} from "../../../screens/Welcome";

import { Controller } from "../navigation/types/flowTypes";

type Dependencies = {
  apiClient?: object;
  analytics?: object;
  featureFlags?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Params;
  deps?: Dependencies;
  config?: Config;
};

export type { Action as WelcomeViewModelAction };

export const WelcomeScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) => new ViewModel(onAction),
  (controller, action) => controller.handleWelcomeAction(action)
);
