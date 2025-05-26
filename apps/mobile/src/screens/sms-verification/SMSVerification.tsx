import { View, Text, Button, SafeAreaView } from "react-native";
import { SMSVerificationViewModel } from "./SMSVerificationViewModel";

export function SMSVerification({
  viewModel,
}: {
  viewModel: SMSVerificationViewModel;
}) {
  return (
    <SafeAreaView>
      <View>
        <Text>SMS Validation</Text>
        <Button title="Ďalej" onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
