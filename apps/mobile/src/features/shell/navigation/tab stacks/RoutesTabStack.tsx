import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DIContainer } from "@monorepo/di";
import * as Flows from "../../../../app-navigation/AppFlows";
import { ShellFlowController } from "../ShellFlowController";

export type RoutesTabStackParamList = {} & Flows.TransportRoutes.ParamList;

const Stack = createNativeStackNavigator<RoutesTabStackParamList>();

interface RoutesTabStackProps {
  controller: ShellFlowController;
  di: DIContainer;
}

export const RoutesTabStack: React.FC<RoutesTabStackProps> = ({
  // GUARD: Possible bad solution [@dmitry.kovalev]
  controller,
  di,
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
        { routesService: di.services.routesService }
      )}
    </Stack.Navigator>
  );
};
