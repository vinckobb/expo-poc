import { View, StyleSheet, ViewStyle, Platform, StyleProp } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "./Text";
import { Button } from "./Button";

type Props = {
  title: string;
  rightLabel?: string;
  onRightPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Header({
  title,
  rightLabel,
  onRightPress,
}: Props) {
  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.container}>
        <Text variant="title">{title}</Text>
        {rightLabel && onRightPress && (
          <Button
            title={rightLabel}
            onPress={onRightPress}
            variant="secondary"
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: Platform.OS === "android" ? 16 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
