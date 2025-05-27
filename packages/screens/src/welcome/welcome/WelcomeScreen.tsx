import { View, Text, Button, SafeAreaView } from "react-native";
import { WelcomeViewModel } from "./WelcomeViewModel";

export function WelcomeScreen({ viewModel }: { viewModel: WelcomeViewModel }) {
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
          Vitaj
        </Text>
        <Button title="About" onPress={() => viewModel.onAboutButton()} />
        <Button title="Login" onPress={() => viewModel.onLoginButton()} />
        <Button title="Routes" onPress={() => viewModel.onRoutesButton()} />
        <Button title="Home" onPress={() => viewModel.onHomeButton()} />
      </View>
    </SafeAreaView>
  );
}
