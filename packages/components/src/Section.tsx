import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./Text";
import { ReactNode } from "react";
import { StyleProp } from "react-native";

type Props = {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Section({ title, children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text variant="subtitle" style={styles.title}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
});
