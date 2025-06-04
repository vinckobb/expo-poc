import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ShellFlowController } from "../ShellFlowController";
import { Home, HomeViewModel } from "@monorepo/screens/home";

export type HomeTabStackParamList = {
  HomeTabRoot: undefined;
};

const Stack = createNativeStackNavigator<HomeTabStackParamList>();

interface HomeTabStackProps {
  controller: ShellFlowController;
}

export const HomeTabStack: React.FC<HomeTabStackProps> = ({ controller }) => {
  const { t } = useTranslation();

  const homeViewModel = useMemo(() => {
    return new HomeViewModel(() => {
      console.log("Navigate from Home");
    });
  }, []);

  return (
    <Stack.Navigator initialRouteName="HomeTabRoot">
      <Stack.Screen
        name="HomeTabRoot"
        options={{ title: t("home.title") }}
        children={() => <Home viewModel={homeViewModel} />}
      />
    </Stack.Navigator>
  );
};
