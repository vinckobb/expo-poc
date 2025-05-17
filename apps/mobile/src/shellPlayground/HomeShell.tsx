import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeShellNavigator } from "./HomeShellNavigator";
import { HomeShellAction } from "./types";

// Типы параметров для стека HomeShell
type HomeShellStackParamList = {
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<HomeShellStackParamList>();

export interface HomeShellProps {
  onAction?: (action: HomeShellAction) => void;
}

export const HomeShell: React.FC<HomeShellProps> = ({ onAction }) => {
  const handleHomeAction = () => {
    onAction?.({ type: "homeAction" });
  };

  const handleSearchAction = () => {
    onAction?.({ type: "searchAction" });
  };

  const handleProfileAction = () => {
    onAction?.({ type: "profileAction" });
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabs"
        children={() => (
          <HomeShellNavigator
            onHomeAction={handleHomeAction}
            onSearchAction={handleSearchAction}
            onProfileAction={handleProfileAction}
          />
        )}
      />
    </Stack.Navigator>
  );
};
