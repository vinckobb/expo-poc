import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeParamList as ParamList } from "./paramList";

export type { ParamList };
export { WelcomeScreens as Screens } from "./routesList";
export type { WelcomeFlowRouterDelegate as Delegate } from "./WelcomeFlowRouterDelegate.interface";
export type { WelcomeFlowRouter as Router } from "./WelcomeFlowRouter.interface";
export type { WelcomeFlowController as Controller } from "./WelcomeFlowController.interface";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;
