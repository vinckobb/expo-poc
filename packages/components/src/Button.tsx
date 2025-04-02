import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { StyleProp } from "react-native";
import { useColorScheme } from "@monorepo/hooks";
import { ButtonStyles, ButtonVariant } from "@monorepo/theme";

import { Text } from "./Text";

type Props = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  style,
}: Props) {
  const theme = useColorScheme();
  const styleSet = ButtonStyles[theme][variant];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: styleSet.backgroundColor,
          borderColor: styleSet.borderColor,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: styleSet.textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
