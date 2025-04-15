import { Text } from "../Text";
import { View } from "../View";

export function Map({ onMarkerPress }: { onMarkerPress: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🧭 Map is not supported on Web yet.</Text>
    </View>
  );
}
