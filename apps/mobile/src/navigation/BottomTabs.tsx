import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen, ProfileScreen } from "@monorepo/screens";

import ExploreStack from "./ExploreStack";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "add";

          if (route.name === "home") iconName = "home";
          else if (route.name === "explore") iconName = "search";
          else if (route.name === "profile") iconName = "person";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0a7ea4",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="home" options={{title: t("home.title")}} component={HomeScreen} />
      <Tab.Screen name="explore" options={{title: t("explore.title")}} component={ExploreStack} />
      <Tab.Screen name="profile" options={{title: t("profile.title")}} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
