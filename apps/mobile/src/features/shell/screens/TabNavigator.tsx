import React from "react";
import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeTabStack } from "../navigation/tab stacks/HomeTabStack";
import { RoutesTabStack } from "../navigation/tab stacks/RoutesTabStack";
import { ProfileTabStack } from "../navigation/tab stacks/ProfileTabStack";
import { ShellFlowController } from "../navigation/ShellFlowController";
import { ShellTabParamList } from "../navigation/types/ShellTabParamList";
import { DIContainer } from "@monorepo/di";

const Tab = createBottomTabNavigator<ShellTabParamList>();

interface TabNavigatorProps {
  controller: ShellFlowController;
  di: DIContainer;
}

export const TabNavigator: React.FC<TabNavigatorProps> = ({
  controller,
  di,
}) => {
  const { t } = useTranslation();
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
        options={{ title: t("home.title") }}
        children={() => <HomeTabStack controller={controller} />}
      />

      <Tab.Screen
        name="RoutesTab"
        options={{ title: t("routes-list.title") }}
        children={() => (
          <RoutesTabStack controller={controller} di={di} />
        )}
      />

      <Tab.Screen
        name="ProfileTab"
        options={{ title: t("profile.title") }}
        children={() => <ProfileTabStack controller={controller} />}
      />
    </Tab.Navigator>
  );
};
