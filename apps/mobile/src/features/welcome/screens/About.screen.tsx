import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  About as View,
  AboutViewModel as ViewModel,
  Action,
} from "../../../screens/About";

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
  params: Flow.ParamList["About"];
  deps?: Dependencies;
  config?: Config;
};

export type { Action as AboutViewModelAction };

export const AboutScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Flow.Controller
>(
  View,
  (params, onAction) => new ViewModel(onAction),
  (controller, action) => controller.handleAboutAction(action)
);
