import { LoginParamList as ParamList } from "./paramList";

export type { ParamList };
export { LoginScreens as Screens } from "./routesList";
export type { LoginFlowRouterDelegate as Delegate } from "./LoginFlowRouterDelegate.interface";
export type { LoginFlowRouter as Router } from "./LoginFlowRouter.interface";
export type { LoginFlowController as Controller } from "./LoginFlowController.interface";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;