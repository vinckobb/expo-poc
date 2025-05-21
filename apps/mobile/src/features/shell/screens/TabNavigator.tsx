import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeTabStack } from "../navigation/tab stacks/HomeTabStack";
import { RoutesTabStack } from "../navigation/tab stacks/RoutesTabStack";
import { ProfileTabStack } from "../navigation/tab stacks/ProfileTabStack";
import { ShellFlowController } from "../navigation/ShellFlowController";
import { ShellTabParamList } from "../navigation/types/ShellTabParamList";
import { QueryClient } from "@tanstack/react-query";

const Tab = createBottomTabNavigator<ShellTabParamList>();

interface TabNavigatorProps {
  controller: ShellFlowController;
  queryClient: QueryClient;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({
  controller,
  queryClient,
}) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "RoutesTab") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ title: "Domov" }}
        children={() => <HomeTabStack controller={controller} />}
      />

      <Tab.Screen
        name="RoutesTab"
        options={{ title: "Hľadať" }}
        children={() => (
          <RoutesTabStack controller={controller} queryClient={queryClient} />
        )}
      />

      <Tab.Screen
        name="ProfileTab"
        options={{ title: "Profil" }}
        children={() => <ProfileTabStack controller={controller} />}
      />
    </Tab.Navigator>
  );
};
