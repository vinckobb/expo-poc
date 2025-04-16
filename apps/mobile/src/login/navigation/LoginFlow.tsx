// LoginFlow.tsx
import React, { useRef, useEffect } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LoginFlowControllerImpl } from "./LoginFlowController";
import { LoginFlowRouterImpl } from "./LoginFlowRouter";
import { LoginFlowRouterDelegate } from "./interfaces/LoginFlowRouterDelegate.interface";
import type { LoginParamList } from "./paramList";

import * as Screens from "../screens";

const Stack = createNativeStackNavigator<LoginParamList>();

type LoginFlowProps = { delegate: LoginFlowRouterDelegate };

export const LoginFlow: React.FC<LoginFlowProps> = ({ delegate }) => {
  const controllerRef = useRef<LoginFlowControllerImpl | null>(null);

  const getController = (
    navigation: NativeStackNavigationProp<LoginParamList>
  ) => {
    if (!controllerRef.current) {
      controllerRef.current = new LoginFlowControllerImpl(
        new LoginFlowRouterImpl(navigation, delegate)
      );
      controllerRef.current.start();
    }
    return controllerRef.current!;
  };

  useEffect(() => {
    return () => {
      controllerRef.current?.dispose?.();
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login">
        {({ navigation, route }) => {
          const controller = getController(navigation);
          return (
            <Screens.LoginScreen
              controller={controller}
              params={route.params}
            />
          );
        }}
      </Stack.Screen>

      <Stack.Screen name="SMSVerification">
        {({ navigation, route }) => {
          const controller = getController(navigation);
          return (
            <Screens.SMSVerificationScreen
              controller={controller}
              params={route.params}
            />
          );
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
