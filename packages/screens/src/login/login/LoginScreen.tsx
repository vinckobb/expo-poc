import { View, Text, Button, SafeAreaView } from "react-native";
import { LoginViewModel } from "./LoginViewModel";

export function LoginScreen({ viewModel }: { viewModel: LoginViewModel }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <Button title="LOG IN" onPress={() => viewModel.onActionButton()} />
        <Button
          title="PASSWORD RECOVERY"
          onPress={() => viewModel.onPasswordRecovery()}
        />
        <Button
          title="REGISTRATION"
          onPress={() => viewModel.onRegistration()}
        />
      </View>
    </SafeAreaView>
  );
}
