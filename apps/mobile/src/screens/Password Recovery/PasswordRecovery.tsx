import { View, Text, Button, SafeAreaView } from "react-native";
import { PasswordRecoveryViewModel } from "./PasswordRecoveryViewModel";

type PasswordRecoveryProps = {
  viewModel: PasswordRecoveryViewModel;
  email: string;
};

export default function PasswordRecovery({
  viewModel,
  email,
}: PasswordRecoveryProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>Password Recovery</Text>
        <Text>{email}</Text>
        <Button title="Ďalej" onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
