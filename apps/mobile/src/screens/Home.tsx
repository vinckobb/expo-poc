import React from "react";
import { View, Text, Button } from "react-native";
import { HomeViewModel } from "./HomeViewModel";

type HomeProps = {
  viewModel: HomeViewModel;
};

export default function Home({ viewModel }: HomeProps) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Ďalej" onPress={viewModel.onButtonPress} />
    </View>
  );
}
