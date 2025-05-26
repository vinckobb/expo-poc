import React from "react";
import * as Flows from "../../../../navigation/AppFlows";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShellFlowController } from "../ShellFlowController";

export type ProfileTabStackParamList = {} & Flows.Profile.ParamList;

const Stack = createNativeStackNavigator<ProfileTabStackParamList>();

interface ProfileTabStackProps {
  controller: ShellFlowController;
}

export const ProfileTabStack: React.FC<ProfileTabStackProps> = ({
  controller,
}) => {
  const transportRoutesFlowDelegate: Flows.Profile.Delegate = {
    openHome: () => {
      // navigation.navigate("");
    },
  };

  return (
    <Stack.Navigator initialRouteName={Flows.Profile.ScreenNames.PROFILE}>
      {Flows.Profile.createFlowScreens<ProfileTabStackParamList>(
        Stack,
        transportRoutesFlowDelegate
      )}
    </Stack.Navigator>
  );
};
