import { View, Text, Button } from "react-native";
import { LoginViewModel } from "./LoginViewModel";

export function Login({ viewModel }: { viewModel: LoginViewModel }) {
  return (
    <View>
      <Text>Login</Text>
      <Button title="Ďalej" onPress={viewModel.onButtonPress} />
    </View>
  );
}
