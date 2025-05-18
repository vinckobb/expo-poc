import { createFlowScreen } from "../../../navigation/types/FlowScreen";
import {
  SMSVerification as View,
  SMSVerificationViewModel as ViewModel,
  Action,
} from "../../../screens/SMS Verification";

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
  params: Flow.ParamList["SMSVerification"];
  deps?: Dependencies;
  config?: Config;
};

export type { Action as SMSVerificationViewModelAction };

export const SMSVerificationScreen = createFlowScreen<
  ParamsType,
  ViewModel,
  Action,
  Flow.Controller
>(
  View,
  (params, onAction) => new ViewModel(params.params, onAction),
  (controller, action) => controller.handleSMSVerificationAction(action)
);
