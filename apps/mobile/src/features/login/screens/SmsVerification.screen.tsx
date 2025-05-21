import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  SMSVerification as View,
  SMSVerificationViewModel as ViewModel,
  Action,
  Params
} from "../../../screens/SMS Verification";

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

export type { Action as SMSVerificationViewModelAction };

export const SMSVerificationScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Controller
>(
  View,
  (params, onAction) => new ViewModel(params.params, onAction),
  (controller, action) => controller.handleSMSVerificationAction(action)
);
