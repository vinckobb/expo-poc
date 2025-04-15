import React from "react";
import { View, Text, Button } from "react-native";
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
    <View>
      <Text>Password Recovery</Text>
      <Text>{email}</Text>
      <Button title="Ďalej" onPress={viewModel.onButtonPress} />
    </View>
  );
}
