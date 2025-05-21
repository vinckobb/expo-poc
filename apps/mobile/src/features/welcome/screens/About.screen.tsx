import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  About as View,
  AboutViewModel as ViewModel,
  Action,
  Params
} from "../../../screens/About";

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

export type { Action as AboutViewModelAction };

export const AboutScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) => new ViewModel(onAction),
  (controller, action) => controller.handleAboutAction(action)
);
