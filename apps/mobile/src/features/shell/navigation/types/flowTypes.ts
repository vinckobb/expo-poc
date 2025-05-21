import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShellParamList as ParamList } from "./paramList";

export type { ParamList };
export type { ShellFlowRouterDelegate as Delegate } from "./ShellFlowRouterDelegate.interface";
export type { ShellScreens as Screens } from "./routesList";

export type Stack<T extends ParamList> = ReturnType<
  typeof createNativeStackNavigator<T>
>;
