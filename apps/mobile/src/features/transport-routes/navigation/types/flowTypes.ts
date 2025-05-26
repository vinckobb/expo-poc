import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesParamList as ParamList } from "./paramList";

export type { ParamList };
export { RouteParamSchemas as ParamSchemas } from "./paramList";
export { RoutesScreens as Screens } from "./routesList";
export type { RoutesScreenName as ScreenName } from "./routesList";
export type { RoutesFlowRouterDelegate as Delegate } from "../interfaces/RoutesFlowRouterDelegate.interface";
export type { RoutesFlowRouter as Router } from "../interfaces/RoutesFlowRouter.interface";
export type { RoutesFlowController as Controller } from "../interfaces/RoutesFlowController.interface";
export * as Actions from "./screenActions";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;

export type ParamsAdapterMap = {
  [K in keyof ParamList]: (input: unknown) => ParamList[K];
};

export const NO_PARAMS = () => undefined;
