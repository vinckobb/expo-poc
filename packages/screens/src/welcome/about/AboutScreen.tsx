import { View, Text, Button, SafeAreaView } from "react-native";
import { AboutViewModel } from "./AboutViewModel";

export function AboutScreen({ viewModel }: { viewModel: AboutViewModel }) {
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
        <Button title="Home" onPress={() => viewModel.onContactButton()} />
        <Button title="Kontakt" onPress={() => viewModel.onContactButton()} />
      </View>
    </SafeAreaView>
  );
}
