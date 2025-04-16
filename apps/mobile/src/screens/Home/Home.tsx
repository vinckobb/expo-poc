import { View, Text, Button, SafeAreaView } from "react-native";
import { HomeViewModel } from "./HomeViewModel";

type HomeProps = {
  viewModel: HomeViewModel;
};

export default function Home({ viewModel }: HomeProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <Button title="Ďalej" onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
