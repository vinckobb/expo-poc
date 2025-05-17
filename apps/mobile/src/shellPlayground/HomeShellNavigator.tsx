import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeShellTabParamList } from "./types";
import { HomeScreen } from "./HomeScreen";
import { SearchRoutesScreen } from "./SearchRoutesScreen";
import { ProfileSettingsScreen } from "./ProfileSettingsScreen";

const Tab = createBottomTabNavigator<HomeShellTabParamList>();

export interface HomeShellNavigatorProps {
  onHomeAction?: () => void;
  onSearchAction?: () => void;
  onProfileAction?: () => void;
}

export const HomeShellNavigator: React.FC<HomeShellNavigatorProps> = ({
  onHomeAction,
  onSearchAction,
  onProfileAction,
}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SearchRoutes") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "ProfileSettings") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="SearchRoutes"
        options={{ title: "Hľadať" }}
        children={() => <SearchRoutesScreen onActionPress={onSearchAction} />}
      />

      <Tab.Screen
        name="Home"
        options={{ title: "Domov" }}
        children={() => <HomeScreen onActionPress={onHomeAction} />}
      />

      <Tab.Screen
        name="ProfileSettings"
        options={{ title: "Profil" }}
        children={() => (
          <ProfileSettingsScreen onActionPress={onProfileAction} />
        )}
      />
    </Tab.Navigator>
  );
};
