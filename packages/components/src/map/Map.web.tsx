import { Text } from "../Text";
import { View } from "../View";
import { Button } from "../Button";

export function Map({ onMarkerPress }: { onMarkerPress: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🧭 Map is not supported on Web yet.</Text>
      <Button title="Show me more" onPress={onMarkerPress}></Button>
    </View>
  );
}
