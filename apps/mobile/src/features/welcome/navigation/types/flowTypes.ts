import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeParamList as ParamList } from "./paramList";

export type { ParamList };
export { WelcomeParamSchemas as ParamSchemas } from "./paramList";
export { WelcomeScreens as Screens } from "./routesList";
export type { WelcomeScreenName as ScreenName } from "./routesList";
export type { WelcomeFlowRouterDelegate as Delegate } from "../interfaces/WelcomeFlowRouterDelegate.interface";
export type { WelcomeFlowRouter as Router } from "../interfaces/WelcomeFlowRouter.interface";
export type { WelcomeFlowController as Controller } from "../interfaces/WelcomeFlowController.interface";
export * as Actions from "./screenActions";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;

export type ParamsAdapterMap = {
  [K in keyof ParamList]: (input: unknown) => ParamList[K];
};

export const NO_PARAMS = () => undefined;
