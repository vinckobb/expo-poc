import * as FlowType from "./types/flowTypes";

export const ParamsAdapter: FlowType.ParamsAdapterMap = {
   [FlowType.Screens.PROFILE]: FlowType.NO_PARAMS,
   [FlowType.Screens.SETTINGS]: FlowType.NO_PARAMS,
   [FlowType.Screens.SECURITY_SETTINGS]: FlowType.NO_PARAMS,
} as const;