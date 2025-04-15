import React, { useEffect, useRef } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

export interface FlowController {
  start: () => void;
  dispose?: () => void;
}

export function createFlow<
  ParamList extends Record<string, object | undefined>,
  ControllerType extends FlowController,
>(config: {
  name: string;
  routeParams: ParamList;
  controllerFactory: (
    nav: NativeStackNavigationProp<ParamList>
  ) => ControllerType;
  screens: {
    [K in keyof ParamList]: {
      screen: React.ComponentType<{ viewModel: any }>;
      createViewModel: (controller: ControllerType) => any;
    };
  };
}) {
  const Stack = createNativeStackNavigator<ParamList>();

  return function FlowComponent() {
    const controllerRef = useRef<ControllerType | null>(null);

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(Object.keys(config.screens) as Array<keyof ParamList>).map((name) => {
          const def = config.screens[name];
          return (
            <Stack.Screen key={name as string} name={name}>
              {({ navigation, route }) => {
                if (!controllerRef.current) {
                  controllerRef.current = config.controllerFactory(navigation);
                  controllerRef.current.start();
                }

                const controller = controllerRef.current;
                const vm = def.createViewModel(controller);
                const Screen = def.screen;
                return <Screen viewModel={vm} />;
              }}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    );
  };
}
