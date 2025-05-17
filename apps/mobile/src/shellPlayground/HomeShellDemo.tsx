import React from "react";
import { Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeShell } from "./HomeShell";
import { HomeShellAction } from "./types";

export const HomeShellDemo = () => {
  const handleAction = (action: HomeShellAction) => {
    Alert.alert("Akcia", `Vykonaná akcia: ${action.type}`);
  };

  return (
    <SafeAreaProvider>
      <HomeShell onAction={handleAction} />
    </SafeAreaProvider>
  );
};
