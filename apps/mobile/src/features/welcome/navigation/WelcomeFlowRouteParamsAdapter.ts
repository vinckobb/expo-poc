import * as FlowType from "./types/flowTypes";

export const ParamsAdapter: FlowType.ParamsAdapterMap = {
  [FlowType.Screens.WELCOME]: FlowType.NO_PARAMS,
  [FlowType.Screens.ABOUT]: FlowType.NO_PARAMS,
} as const;
