import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginParamList as ParamList } from "./paramList";

export type { ParamList };
export { LoginParamSchemas as ParamSchemas } from "./paramList";
export { LoginScreens as Screens } from "./routesList";
export type { LoginScreenName as ScreenName } from "./routesList";
export type { LoginFlowRouterDelegate as Delegate } from "../interfaces/LoginFlowRouterDelegate.interface";
export type { LoginFlowRouter as Router } from "../interfaces/LoginFlowRouter.interface";
export type { LoginFlowController as Controller } from "../interfaces/LoginFlowController.interface";
export * as Actions from "./screenActions";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;

export type ParamsAdapterMap = {
  [K in keyof ParamList]: (input: unknown) => ParamList[K];
};

export const NO_PARAMS = () => undefined;
