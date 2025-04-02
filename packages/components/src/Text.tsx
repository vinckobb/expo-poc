import { Text as RNText, StyleSheet, TextProps, TextStyle } from "react-native";
import { StyleProp } from "react-native";
import { useThemeColor } from "@monorepo/hooks";

type Variant = "title" | "subtitle" | "body";

type Props = TextProps & {
  variant?: Variant;
  style?: StyleProp<TextStyle>;
};

export function Text({ variant = "body", style, ...rest }: Props) {
  const color = useThemeColor({}, "text");
  return <RNText style={[styles[variant], { color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
  },
});
