import { View, Text, Button, SafeAreaView } from "react-native";
import { WelcomeViewModel } from "./WelcomeViewModel";

export default function Welcome({
  viewModel,
}: {
  viewModel: WelcomeViewModel;
}) {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome</Text>
        <Button title="Dalej" onPress={() => viewModel.onActionButton()} />
      </View>
    </SafeAreaView>
  );
}
