import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  Welcome as View,
  WelcomeViewModel as ViewModel,
  Action,
} from "../../../screens/Welcome";

import * as Flow from "../navigation/Flow";

type Dependencies = {
  apiClient?: object;
  analytics?: object;
  featureFlags?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Flow.ParamList["Welcome"];
  deps?: Dependencies;
  config?: Config;
};

export type { Action as WelcomeViewModelAction };

export const WelcomeScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Flow.Controller
>(
  View,
  (params, onAction) => new ViewModel(onAction),
  (controller, action) => controller.handleWelcomeAction(action)
);
