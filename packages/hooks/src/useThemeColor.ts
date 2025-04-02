/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@monorepo/constants";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  const colorFromProps = props[resolvedTheme];

  return colorFromProps ?? Colors[resolvedTheme][colorName];
}
