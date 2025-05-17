import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface SearchRoutesScreenProps {
  onActionPress?: () => void;
}

export const SearchRoutesScreen: React.FC<SearchRoutesScreenProps> = ({
  onActionPress,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hľadať trasy</Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onActionPress || (() => {})}
      >
        <Text style={styles.actionButtonText}>Hľadať</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
