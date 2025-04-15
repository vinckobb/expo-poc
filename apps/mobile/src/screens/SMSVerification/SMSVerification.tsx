import React from "react";
import { View, Text, Button } from "react-native";
import { SMSVerificationViewModel } from "./SMSVerificationViewModel";

export function SMSVerification({
  viewModel,
}: {
  viewModel: SMSVerificationViewModel;
}) {
  return (
    <View>
      <Text>SMS Validation</Text>
      <Text>{viewModel.phoneNumber}</Text>
      <Button title="Ďalej" onPress={viewModel.onButtonPress} />
    </View>
  );
}
