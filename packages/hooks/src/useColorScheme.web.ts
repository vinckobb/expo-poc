import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

export function useColorScheme() {
  // const [hasHydrated, setHasHydrated] = useState(false);
  // const [scheme, setScheme] = useState<"light" | "dark">("light");

  // useEffect(() => {
  //   const detected = useRNColorScheme();
  //   if (detected) setScheme(detected);
  //   setHasHydrated(true);
  // }, []);

  // return hasHydrated ? scheme : "light";
  return 'light';
}
