import React from "react";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Stack.Navigator initialRouteName="HomeTabRoot">
      <Stack.Screen
        name="HomeTabRoot"
        options={{ title: t("home.title") }}
        children={() => <Text>{t("home.label.text")}</Text>}
      />
    </Stack.Navigator>
  );
};
