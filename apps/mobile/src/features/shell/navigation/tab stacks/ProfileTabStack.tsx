import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShellFlowController } from "../ShellFlowController";

export type ProfileTabStackParamList = {
  ProfileTabRoot: undefined;
};

const Stack = createNativeStackNavigator<ProfileTabStackParamList>();

interface ProfileTabStackProps {
  controller: ShellFlowController;
}

export const ProfileTabStack: React.FC<ProfileTabStackProps> = ({
  controller,
}) => {
  return (
    <Stack.Navigator initialRouteName="ProfileTabRoot">
      <Stack.Screen
        name="ProfileTabRoot"
        options={{ title: "Profil" }}
        children={() => <Text>Profil - nastavenia účtu</Text>}
      />
    </Stack.Navigator>
  );
};
