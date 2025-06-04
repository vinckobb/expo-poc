import React from "react";
import * as FlowType from "./types/flowTypes";
import { ShellFlowRouterDelegate } from "./interfaces/ShellFlowRouterDelegate.interface";
import { ShellScreen } from "../screens/ShellScreen";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { DIContainer } from "@monorepo/di";

export type ShellDependencies = {
  di: DIContainer;
};

export function createShellFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: ShellFlowRouterDelegate,
  di: DIContainer
) {
  return (
    <Stack.Screen
      name="Shell"
      options={{ headerShown: false } as NativeStackNavigationOptions}
      children={() => <ShellScreen delegate={delegate} di={di} />}
    />
  );
}
