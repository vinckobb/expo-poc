import React from "react";
import * as FlowType from "./types/flowTypes";
import { ShellFlowRouterDelegate } from "./types/ShellFlowRouterDelegate.interface";
import { ShellScreen } from "../screens/ShellScreen";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export function createShellFlowScreens<T extends FlowType.ParamList>(
  Stack: FlowType.Stack<T>,
  delegate: ShellFlowRouterDelegate
) {
  return (
    <Stack.Screen
      name="Shell"
      options={{ headerShown: false } as NativeStackNavigationOptions}
      children={() => <ShellScreen delegate={delegate} />}
    />
  );
}
