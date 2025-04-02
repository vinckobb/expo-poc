import { Colors } from "@monorepo/constants";

export type ButtonVariant = "primary" | "secondary";

export const ButtonStyles = {
  light: {
    primary: {
      backgroundColor: Colors.light.tint,
      borderColor: "transparent",
      textColor: Colors.light.background,
    },
    secondary: {
      backgroundColor: "transparent",
      borderColor: Colors.light.tint,
      textColor: Colors.light.tint,
    },
  },
  dark: {
    primary: {
      backgroundColor: Colors.dark.tint,
      borderColor: "transparent",
      textColor: Colors.dark.background,
    },
    secondary: {
      backgroundColor: "transparent",
      borderColor: Colors.dark.tint,
      textColor: Colors.dark.tint,
    },
  },
} as const;
