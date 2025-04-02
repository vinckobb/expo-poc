import { Platform, useColorScheme as useSystemColorScheme } from "react-native";
import { useEffect, useState } from "react";

export function useColorScheme(): "light" | "dark" {
  if (Platform.OS !== "web") {
    const scheme = useSystemColorScheme();
    return scheme === "dark" ? "dark" : "light";
  }

  const [scheme, setScheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      setScheme(e.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return scheme;
}
