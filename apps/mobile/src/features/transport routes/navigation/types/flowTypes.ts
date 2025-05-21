import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesParamList as ParamList } from "./paramList";

export type { ParamList };
export { RouteParamSchemas as ParamSchemas } from "./paramList";
export { RoutesScreens as Screens } from "./routesList";
export type { RoutesScreenName as ScreenName } from "./routesList";
export type { RoutesFlowRouterDelegate as Delegate } from "./RoutesFlowRouterDelegate.interface";
export type { RoutesFlowRouter as Router } from "./RoutesFlowRouter.interface";
export type { RoutesFlowController as Controller } from "./RoutesFlowController.interface";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;
