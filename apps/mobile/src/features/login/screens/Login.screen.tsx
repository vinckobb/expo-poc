import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  Login as View,
  LoginViewModel as ViewModel,
  Action,
} from "../../../screens/Login";

import * as Flow from "../navigation/types/flowTypes";

type Dependencies = {
  apiClient?: object;
  analytics?: object;
  featureFlags?: object;
};

type Config = {
  showDebugInfo?: boolean;
};

type ParamsType = {
  params: Flow.ParamList["Login"];
  deps?: Dependencies;
  config?: Config;
};

export type { Action as LoginViewModelAction };

export const LoginScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Flow.Controller
>(
  View,
  (params, onAction) => new ViewModel(params.params, onAction),
  (controller, action) => controller.handleLoginAction(action)
);
