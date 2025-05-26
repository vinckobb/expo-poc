import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileParamList as ParamList } from "./paramList";

export type { ParamList };
export { ProfileParamSchemas as ParamSchemas } from "./paramList";
export { ProfileScreens as Screens } from "./routesList";
export type { ProfileScreenName as ScreenName } from "./routesList";
export type { ProfileFlowRouterDelegate as Delegate } from "../interfaces/ProfileFlowRouterDelegate.interface";
export type { ProfileFlowRouter as Router } from "../interfaces/ProfileFlowRouter.interface";
export type { ProfileFlowController as Controller } from "../interfaces/ProfileFlowController.interface";
export * as Actions from "./screenActions";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;

export type ParamsAdapterMap = {
  [K in keyof ParamList]: (input: unknown) => ParamList[K];
};

export const NO_PARAMS = () => undefined;