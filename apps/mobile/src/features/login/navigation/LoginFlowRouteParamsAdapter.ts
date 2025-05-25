import * as FlowType from "./types/flowTypes";

export const ParamsAdapter: FlowType.ParamsAdapterMap = {
  [FlowType.Screens.LOGIN]: FlowType.NO_PARAMS,
  [FlowType.Screens.SMS_VERIFICATION]: FlowType.NO_PARAMS,
} as const;
