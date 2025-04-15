import React from "react";
import { View, Text, Button } from "react-native";
import { WelcomeViewModel } from "./WelcomeViewModel";

export default function Welcome({
  viewModel,
}: {
  viewModel: WelcomeViewModel;
}) {
  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Далее" onPress={viewModel.onButtonPress} />
    </View>
  );
}
