import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShellFlowController } from "../ShellFlowController";

export type HomeTabStackParamList = {
  HomeTabRoot: undefined;
};

const Stack = createNativeStackNavigator<HomeTabStackParamList>();

interface HomeTabStackProps {
  controller: ShellFlowController;
}

export const HomeTabStack: React.FC<HomeTabStackProps> = ({ controller }) => {
  return (
    <Stack.Navigator initialRouteName="HomeTabRoot">
      <Stack.Screen
        name="HomeTabRoot"
        options={{ title: "Domov" }}
        children={() => <Text>Home - main screen</Text>}
      />
    </Stack.Navigator>
  );
};
