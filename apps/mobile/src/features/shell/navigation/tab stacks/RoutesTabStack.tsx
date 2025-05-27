import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Flows from "../../../../app-navigation/AppFlows";
import { ShellFlowController } from "../ShellFlowController";
import { QueryClient } from "@tanstack/react-query";

export type RoutesTabStackParamList = {} & Flows.TransportRoutes.ParamList;

const Stack = createNativeStackNavigator<RoutesTabStackParamList>();

interface RoutesTabStackProps {
  controller: ShellFlowController;
  queryClient: QueryClient;
}

export const RoutesTabStack: React.FC<RoutesTabStackProps> = ({
  // GUARD: Possible bad solution [@dmitry.kovalev]
  controller,
  queryClient,
}) => {
  const transportRoutesFlowDelegate: Flows.TransportRoutes.Delegate = {
    openHome: () => {
      // navigation.navigate("");
    },
  };

  return (
    <Stack.Navigator
      initialRouteName={Flows.TransportRoutes.ScreenNames.ROUTES_LIST}
    >
      {Flows.TransportRoutes.createFlowScreens<RoutesTabStackParamList>(
        Stack,
        transportRoutesFlowDelegate,
        { queryClient: queryClient }
      )}
    </Stack.Navigator>
  );
};
