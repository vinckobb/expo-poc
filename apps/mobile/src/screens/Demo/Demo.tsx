import { View, Text, Button, SafeAreaView } from "react-native";
import { DemoViewModel } from "./DemoViewModel";

export function Demo({ viewModel }: { viewModel: DemoViewModel }) {
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 24,
          }}
        >
          O aplikácii
        </Text>
        <Button title="Home" onPress={() => viewModel.onHomeButton()} />
      </View>
    </SafeAreaView>
  );
}
